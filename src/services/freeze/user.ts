import { apiFetch } from '#/services/httpClient'

export type UserSignUpDTO = {
    fullName: string,
    password: string,
    email: string
}

export type UserLoginDTO = {
    password: string,
    email: string
}

export type User = {
    id: string
    fullName: string
    email: string
    birthDate: string
    createdAt: string
}

const ENDPOINT = 'users'

export function getMe(): Promise<User> {
  return apiFetch<User>(`${ENDPOINT}/me`, {
    method: 'GET',
  })
}

export function login(data: UserLoginDTO): Promise<void> {
  return apiFetch<void>(`${ENDPOINT}/login`, {
    method: 'POST',
    public: true,
    body: JSON.stringify(data),
  })
}

export function signUp(data: UserSignUpDTO): Promise<string> {
  return apiFetch<string>(`${ENDPOINT}/signUp`, {
    method: 'POST',
    public: true,
    body: JSON.stringify(data),
  })
}
