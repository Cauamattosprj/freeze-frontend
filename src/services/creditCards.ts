export type CreditCard = {
  id?: string
  holderName: string
  number: string
  expiry: string // MM/YY
  cvv?: string
  [key: string]: any
}

const BASE_URL = '/api/credit-cards'

async function baseFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.headers.get('content-type')?.includes('application/json')
    ? (await res.json() as T)
    : (null as unknown as T)
}

export function getCreditCards(): Promise<CreditCard[]> {
  return baseFetch<CreditCard[]>(BASE_URL)
}

export function getCreditCard(id: string): Promise<CreditCard> {
  return baseFetch<CreditCard>(`${BASE_URL}/${id}`)
}

export function createCreditCard(data: CreditCard): Promise<CreditCard> {
  return baseFetch<CreditCard>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateCreditCard(id: string, data: Partial<CreditCard>): Promise<CreditCard> {
  return baseFetch<CreditCard>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteCreditCard(id: string): Promise<void> {
  return baseFetch<void>(`${BASE_URL}/${id}`, { method: 'DELETE' })
}