import { apiFetch } from '#/services/httpClient'

export type Balance = {
  id?: string
  initialAmount: number
}

const ENDPOINT = 'balance'

export function getBalance(): Promise<number> {
  return apiFetch<number>(ENDPOINT)
}
