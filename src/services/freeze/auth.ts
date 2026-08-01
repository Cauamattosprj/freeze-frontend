import { apiFetch } from '#/services/httpClient'

export function validateToken(): Promise<unknown> {
  return apiFetch<unknown>('auth/validate', { method: 'GET' })
}

export function logout(): Promise<unknown> {
  return apiFetch<unknown>('auth/logout', { method: 'POST' })
}

export async function checkTokenValidity(): Promise<boolean> {
  try {
    validateToken()
    return true
  } catch {
    return false
  }
}
