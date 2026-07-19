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
  return useQuery({ queryKey: incomeListKey, queryFn: getIncomes })
}

export function useGetIncomeQuery(id?: string) {
  return useQuery({ queryKey: incomeKey(id), queryFn: () => getIncome(id as string) })
}

export function useCreateIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createIncome,
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeListKey }),
    onError: (error) => console.log("Erro ao tentar realizar a mutation", error)
  })
}

export function useUpdateIncomeMutation(id: string, data: Partial<Income>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateIncome(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeListKey }),
  })
}

export function useDeleteIncomeMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => qc.invalidateQueries({ queryKey: incomeListKey }),
  })
}
