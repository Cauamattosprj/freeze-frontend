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

const ENDPOINT = 'users'

export function getUserById(id: string): Promise<any> {
  return apiFetch<string>(`${ENDPOINT}/${id}`, {
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
