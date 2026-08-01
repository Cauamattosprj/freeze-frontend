import { apiFetch } from '#/services/httpClient'
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

const ENDPOINT = 'expenses'

export function getExpenses(): Promise<Expense[]> {
  return apiFetch<Expense[]>(ENDPOINT)
}

export function getExpensesByCreditCard(creditCardId: string): Promise<Expense[]> {
  return apiFetch<Expense[]>(`${ENDPOINT}?creditCardId${creditCardId}`, { method: 'GET' })
}

export function getExpense(id: string): Promise<Expense> {
  return apiFetch<Expense>(`${ENDPOINT}/${id}`)
}

export function createExpense(data: Expense): Promise<Expense> {
  return apiFetch<Expense>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateExpense(expense: Partial<Expense>): Promise<Expense> {
  return apiFetch<Expense>(`${ENDPOINT}/${expense.id as string}`, {
    method: 'PUT',
    body: JSON.stringify(expense),
  })
}

export function deleteExpense(id: string): Promise<void> {
  return apiFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
