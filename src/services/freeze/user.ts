import { VITE_API_URL } from "#/lib/constants"

export type UserSignUpDTO = {
    fullName: string,
    password: string,
    email: string
}

export type UserLoginDTO = {
    password: string,
    email: string
}

const ENDPOINT = 'users'

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

export function getUserById(id: string): Promise<any> {
  return baseFetch<string>(`${ENDPOINT}/${id}`, {
    method: 'GET',
  })
}

export function login(data: UserLoginDTO): Promise<string> {
  return baseFetch<string>(`${ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function signUp(data: UserSignUpDTO): Promise<string> {
  return baseFetch<string>(`${ENDPOINT}/signUp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}