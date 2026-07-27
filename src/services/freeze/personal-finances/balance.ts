import { VITE_API_URL } from "#/lib/constants"

export type Balance = {
  id?: string
  initialAmount: Number
}

const ENDPOINT = 'v1/balance'

async function baseFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${VITE_API_URL}${url}`, options)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.headers.get('content-type')?.includes('application/json')
    ? (await res.json() as T)
    : (null as unknown as T)
}

export function getBalance(): Promise<Number> {
  return baseFetch<Number>(`${ENDPOINT}`)
}