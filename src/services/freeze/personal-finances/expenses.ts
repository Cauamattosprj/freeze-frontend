import { VITE_API_URL } from "#/lib/constants"
import type { ExpenseStatusEnum } from "#/utils/personalFinanceEnums"

export type Expense = {
  id?: string
  label: string
  amount: number
  status: ExpenseStatusEnum
  dueDate: string
  category: string
  creditCardId?: string
}

const ENDPOINT = 'v1/expenses'

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

export function getExpenses(): Promise<Expense[]> {
  return baseFetch<Expense[]>(ENDPOINT)
}

export function getExpensesByCreditCard(creditCardId: string): Promise<Expense[]> {
  return baseFetch<Expense[]>(`${ENDPOINT}?creditCardId${creditCardId}`, { method: 'GET' })
}

export function getExpense(id: string): Promise<Expense> {
  return baseFetch<Expense>(`${ENDPOINT}/${id}`)
}

export function createExpense(data: Expense): Promise<Expense> {
  return baseFetch<Expense>(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateExpense(expense: Partial<Expense>): Promise<Expense> {
  return baseFetch<Expense>(`${ENDPOINT}/${expense.id as string}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
}

export function deleteExpense(id: string): Promise<void> {
  return baseFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}