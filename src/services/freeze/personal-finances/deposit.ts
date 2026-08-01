import { apiFetch } from '#/services/httpClient'

export type Deposit = {
  id?: string
  amount: number
  date: Date
}

const ENDPOINT = 'deposits'

export function getDeposits(): Promise<Deposit[]> {
  return apiFetch<Deposit[]>(ENDPOINT)
}

export function getDeposit(id: string): Promise<Deposit> {
  return apiFetch<Deposit>(`${ENDPOINT}/${id}`)
}

export function createDeposit(data: Deposit): Promise<Deposit> {
  return apiFetch<Deposit>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateDeposit(id: string, data: Partial<Deposit>): Promise<Deposit> {
  return apiFetch<Deposit>(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteDeposit(id: string): Promise<void> {
  return apiFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
