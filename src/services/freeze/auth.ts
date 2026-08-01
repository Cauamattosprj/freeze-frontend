import { apiFetch } from '#/services/httpClient'

export async function validateToken(): Promise<unknown> {
  return await apiFetch<unknown>('auth/validate', { method: 'GET' })
}

export async function logout(): Promise<unknown> {
  return await apiFetch<unknown>('auth/logout', { method: 'POST' })
}

export async function checkTokenValidity(): Promise<boolean> {
  try {
    await validateToken()
    return true
  } catch {
    return false
  }
}
