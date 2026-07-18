export type Income = {
  id?: string
  holderName: string
  number: string
  expiry: string
  cvv?: string
  limit: number
  brand: string
}

const BASE_URL = '/api/incomes'

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

export function getIncomes(): Promise<Income[]> {
  return baseFetch<Income[]>(BASE_URL)
}

export function getIncome(id: string): Promise<Income> {
  return baseFetch<Income>(`${BASE_URL}/${id}`)
}

export function createIncome(data: Income): Promise<Income> {
  return baseFetch<Income>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateIncome(id: string, data: Partial<Income>): Promise<Income> {
  return baseFetch<Income>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteIncome(id: string): Promise<void> {
  return baseFetch<void>(`${BASE_URL}/${id}`, { method: 'DELETE' })
}