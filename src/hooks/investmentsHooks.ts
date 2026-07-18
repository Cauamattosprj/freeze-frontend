import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getInvestments,
  getInvestment,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  type Investment,
} from '#/services/freeze/personal-finances/investments'

const investmentListKey = ['investments']
const investmentKey = (id: string | undefined) => ['investment', id] as const

export function useGetInvestmentsQuery() {
  return useQuery({ queryKey: investmentListKey, queryFn: getInvestments })
}

export function useGetInvestmentQuery(id?: string) {
  return useQuery({ queryKey: investmentKey(id), queryFn: () => getInvestment(id as string) })
}

export function useCreateInvestmentMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createInvestment,
    onSuccess: () => qc.invalidateQueries({ queryKey: investmentListKey }),
  })
}

export function useUpdateInvestmentMutation(id: string, data: Partial<Investment>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateInvestment(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: investmentListKey }),
  })
}

export function useDeleteInvestmentMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteInvestment,
    onSuccess: () => qc.invalidateQueries({ queryKey: investmentListKey }),
  })
}
