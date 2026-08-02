import { apiFetch } from '#/services/httpClient'
import type { IncomeStatusEnum } from '#/utils/personalFinanceEnums'

export type Income = {
  id?: string
  label: string
  amount: number
  status: IncomeStatusEnum
  dueDate: string
  category: string
}

const ENDPOINT = 'incomes'

export function getIncomes(): Promise<Income[]> {
  return apiFetch<Income[]>(ENDPOINT)
}

export function getIncome(id: string): Promise<Income> {
  return apiFetch<Income>(`${ENDPOINT}/${id}`)
}

export function createIncome(data: Income): Promise<Income> {
  return apiFetch<Income>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateIncome(data: Partial<Income>): Promise<Income> {
  return apiFetch<Income>(`${ENDPOINT}/${data.id as string}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteIncome(id: string): Promise<void> {
  return apiFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
