import { VITE_API_URL } from "#/lib/constants"

export type ApiFetchOptions = RequestInit & {
  public?: boolean
}

let refreshPromise: Promise<boolean> | null = null
let onUnauthorized: () => void = () => {}

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

async function requestRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${VITE_API_URL}auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.ok)
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
  retried = false,
): Promise<T> {
  const { public: isPublic, ...request } = options
  console.log("var:", import.meta.env.VITE_API_URL);

  const response = await fetch(`${VITE_API_URL}${path}`, {
    ...request,
    credentials: 'include',
    headers: {
      ...(request.body ? { 'Content-Type': 'application/json' } : {}),
      ...request.headers,
    },
  })

  console.log(`Request to ${path} returned status ${response.status}`, response)

  if (response.status === 401 && !isPublic && !retried) {
    const refreshed = await requestRefresh()
    if (refreshed) {
      return apiFetch<T>(path, options, true)
    }
    onUnauthorized()
    throw new Error('Sessão expirada')
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || response.statusText)
  }

  if (response.status === 204) {
    return null as T
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return (await response.json()) as T
  }

  return null as T
}
