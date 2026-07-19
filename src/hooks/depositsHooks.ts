import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDeposits,
  getDeposit,
  createDeposit,
  updateDeposit,
  deleteDeposit,
  type Deposit,
} from '#/services/freeze/personal-finances/deposit'

const depositListKey = ['deposits']
const depositKey = (id: string | undefined) => ['deposit', id] as const

export function useGetDepositsQuery() {
  return useQuery({ queryKey: depositListKey, queryFn: getDeposits })
}

export function useGetDepositQuery(id?: string) {
  return useQuery({ queryKey: depositKey(id), queryFn: () => getDeposit(id as string) })
}

export function useCreateDepositMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createDeposit,
    onSuccess: () => qc.invalidateQueries({ queryKey: depositListKey }),
  })
}

export function useUpdateDepositMutation(id: string, data: Partial<Deposit>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateDeposit(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: depositListKey }),
  })
}

export function useDeleteDepositMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteDeposit,
    onSuccess: () => qc.invalidateQueries({ queryKey: depositListKey }),
  })
}
