import { VITE_API_URL } from "#/lib/constants"

export type Income = {
  id?: string
  label: string
  amount: number
  status: string
  dueDate: string
  category: string
}

const ENDPOINT = '/incomes'

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

export function getIncomes(): Promise<Income[]> {
  return baseFetch<Income[]>(ENDPOINT)
}

export function getIncome(id: string): Promise<Income> {
  return baseFetch<Income>(`${ENDPOINT}/${id}`)
}

export function createIncome(data: Income): Promise<Income> {
  return baseFetch<Income>(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateIncome(id: string, data: Partial<Income>): Promise<Income> {
  return baseFetch<Income>(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteIncome(id: string): Promise<void> {
  return baseFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}