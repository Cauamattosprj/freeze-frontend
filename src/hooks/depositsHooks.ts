import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getDeposits,
  getDeposit,
  createDeposit,
  updateDeposit,
  deleteDeposit,
  type Deposit,
} from '#/services/freeze/personal-finances/deposit'
import { getErrorMessage } from '#/lib/utils'

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: depositListKey })
      toast.success('Depósito criado com sucesso.')
    },
    onError: (error) => {
      console.error('Error creating deposit:', error)
      toast.error(getErrorMessage(error, 'Não foi possível criar o depósito.'))
    },
  })
}

export function useUpdateDepositMutation(id: string, data: Partial<Deposit>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateDeposit(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: depositListKey })
      toast.success('Depósito atualizado com sucesso.')
    },
    onError: (error) => {
      console.error('Error updating deposit:', error)
      toast.error(getErrorMessage(error, 'Não foi possível atualizar o depósito.'))
    },
  })
}

export function useDeleteDepositMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteDeposit,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: depositListKey })
      toast.success('Depósito removido com sucesso.')
    },
    onError: (error) => {
      console.error('Error deleting deposit:', error)
      toast.error(getErrorMessage(error, 'Não foi possível remover o depósito.'))
    },
  })
}
