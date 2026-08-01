import { apiFetch } from '#/services/httpClient'

export type CreditCard = {
  id?: string
  label?: string
  holderName: string
  number: string
  expiry: string
  cvv?: string
  limitAmount: number
  brand: string
  dueDate: string
}

const ENDPOINT = 'v1/credit-cards'

export function getCreditCards(): Promise<CreditCard[]> {
  return apiFetch<CreditCard[]>(ENDPOINT)
}

export function getCreditCard(id: string): Promise<CreditCard> {
  return apiFetch<CreditCard>(`${ENDPOINT}/${id}`)
}

export function createCreditCard(data: CreditCard): Promise<CreditCard> {
  return apiFetch<CreditCard>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateCreditCard(id: string, data: Partial<CreditCard>): Promise<CreditCard> {
  return apiFetch<CreditCard>(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCreditCard(id: string): Promise<void> {
  return apiFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
