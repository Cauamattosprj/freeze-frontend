import { VITE_API_URL } from "#/lib/constants"

export type Deposit = {
  id?: string
  amount: number
  date: Date
}

const ENDPOINT = 'v1/deposits'

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

export function getDeposits(): Promise<Deposit[]> {
  return baseFetch<Deposit[]>(ENDPOINT)
}

export function getDeposit(id: string): Promise<Deposit> {
  return baseFetch<Deposit>(`${ENDPOINT}/${id}`)
}

export function createDeposit(data: Deposit): Promise<Deposit> {
  return baseFetch<Deposit>(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateDeposit(id: string, data: Partial<Deposit>): Promise<Deposit> {
  return baseFetch<Deposit>(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteDeposit(id: string): Promise<void> {
  return baseFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}