import { apiFetch } from '#/services/httpClient'

export type Balance = {
  id?: string
  initialAmount: number
}

const ENDPOINT = 'v1/balance'

export function getBalance(): Promise<number> {
  return apiFetch<number>(ENDPOINT)
}
