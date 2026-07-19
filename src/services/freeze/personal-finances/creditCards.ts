import { VITE_API_URL } from "#/lib/constants"

export type CreditCard = {
  id?: string
  label?: string
  holderName: string
  number: string
  expiry: string
  cvv?: string
  limit: number
  brand: string
  dueDate: string
}

const ENDPOINT = '/credit-cards'

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

export function getCreditCards(): Promise<CreditCard[]> {
  return baseFetch<CreditCard[]>(ENDPOINT)
}

export function getCreditCard(id: string): Promise<CreditCard> {
  return baseFetch<CreditCard>(`${ENDPOINT}/${id}`)
}

export function createCreditCard(data: CreditCard): Promise<CreditCard> {
  return baseFetch<CreditCard>(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateCreditCard(id: string, data: Partial<CreditCard>): Promise<CreditCard> {
  return baseFetch<CreditCard>(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteCreditCard(id: string): Promise<void> {
  return baseFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}