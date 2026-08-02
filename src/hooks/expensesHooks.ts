import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  type Expense,
  getExpensesByCreditCard,
} from '#/services/freeze/personal-finances/expenses'
import { getErrorMessage } from '#/lib/utils'

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
      toast.success('Despesa criada com sucesso.')
    },
    onError: (error) => {
      console.error('Error creating expense:', error)
      toast.error(getErrorMessage(error, 'Não foi possível criar a despesa.'))
    },
  })
}

export function useUpdateExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (expense: Partial<Expense>) => updateExpense(expense),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: expenseListKey })
      qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('Despesa atualizada com sucesso.')
    },
    onError: (error) => {
      console.error('Error updating expense:', error)
      toast.error(getErrorMessage(error, 'Não foi possível atualizar a despesa.'))
    },
  })
}

export function useDeleteExpenseMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: expenseListKey })
      toast.success('Despesa removida com sucesso.')
    },
    onError: (error) => {
      console.error('Error deleting expense:', error)
      toast.error(getErrorMessage(error, 'Não foi possível remover a despesa.'))
    },
  })
}
