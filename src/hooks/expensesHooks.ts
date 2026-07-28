import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  type Expense,
  getExpensesByCreditCard,
} from '#/services/freeze/personal-finances/expenses'

const expenseListKey = ['expenses']
const expenseKey = (id: string | undefined) => ['expense', id] as const

export function useGetExpensesQuery() {
  return useQuery({ queryKey: expenseListKey, queryFn: getExpenses })
}

export function useGetExpensesByCreditCardQuery(id: string) {
  return useQuery({queryKey: expenseKey(id), queryFn: () => getExpensesByCreditCard(id as string)})
}

export function useGetExpenseQuery(id: string) {
  return useQuery({ queryKey: expenseKey(id), queryFn: () => getExpense(id as string) })
}

export function useCreateExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createExpense,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [expenseListKey] })
      await qc.invalidateQueries({ queryKey: ['balance'] })
    },
  })
}

export function useUpdateExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (expense: Partial<Expense>) => updateExpense(expense),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: expenseListKey }),
      qc.invalidateQueries({ queryKey: ['balance'] })
    },
    onError: (error) => console.error('Error updating expense:', error),
  })
}

export function useDeleteExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseListKey }),
  })
}
