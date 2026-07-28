import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
  type Income,
} from '#/services/freeze/personal-finances/incomes'

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
    },
    onError: (error) => console.log("Erro ao tentar realizar a mutation", error)
  })
}

export function useUpdateIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (income: Partial<Income>) => updateIncome(income),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: incomeListKey }),
      qc.invalidateQueries({queryKey: ['balance']})
    },
    onError: (error) => console.error('Error updating income:', error),
  })
}

export function useDeleteIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: incomeListKey })
      qc.invalidateQueries({ queryKey: ['balance'] })
    },
  })
}
