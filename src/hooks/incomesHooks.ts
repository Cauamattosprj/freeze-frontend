import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
  type Income,
} from '#/services/freeze/personal-finances/incomes'
import { getErrorMessage } from '#/lib/utils'

const incomeListKey = ['incomes']
const incomeKey = (id: string | undefined) => ['income', id] as const

export function useGetIncomesQuery() {
  return useQuery({ queryKey: incomeListKey, queryFn: getIncomes, staleTime: 5 * 60 * 1000 })
}

export function useGetIncomeQuery(id?: string) {
  return useQuery({ queryKey: incomeKey(id), queryFn: () => getIncome(id as string) })
}

export function useCreateIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createIncome,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [incomeListKey] })
      await qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('Receita criada com sucesso.')
    },
    onError: (error) => {
      console.error('Error creating income:', error)
      toast.error(getErrorMessage(error, 'Não foi possível criar a receita.'))
    },
  })
}

export function useUpdateIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (income: Partial<Income>) => updateIncome(income),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: incomeListKey })
      qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('Receita atualizada com sucesso.')
    },
    onError: (error) => {
      console.error('Error updating income:', error)
      toast.error(getErrorMessage(error, 'Não foi possível atualizar a receita.'))
    },
  })
}

export function useDeleteIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: incomeListKey })
      qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('Receita removida com sucesso.')
    },
    onError: (error) => {
      console.error('Error deleting income:', error)
      toast.error(getErrorMessage(error, 'Não foi possível remover a receita.'))
    },
  })
}
