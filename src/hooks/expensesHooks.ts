import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  type Expense,
} from '#/services/freeze/personal-finances/expenses'

const expenseListKey = ['expenses']
const expenseKey = (id: string | undefined) => ['expense', id] as const

export function useGetExpensesQuery() {
  return useQuery({ queryKey: expenseListKey, queryFn: getExpenses })
}

export function useGetExpenseQuery(id?: string) {
  return useQuery({ queryKey: expenseKey(id), queryFn: () => getExpense(id as string) })
}

export function useCreateExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseListKey }),
  })
}

export function useUpdateExpenseMutation(id: string, data: Partial<Expense>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateExpense(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseListKey }),
  })
}

export function useDeleteExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseListKey }),
  })
}
