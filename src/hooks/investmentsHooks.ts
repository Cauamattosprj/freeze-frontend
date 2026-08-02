import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getInvestments,
  getInvestment,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  type Investment,
} from '#/services/freeze/personal-finances/investments'
import { getErrorMessage } from '#/lib/utils'

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: investmentListKey })
      toast.success('Investimento criado com sucesso.')
    },
    onError: (error) => {
      console.error('Error creating investment:', error)
      toast.error(getErrorMessage(error, 'Não foi possível criar o investimento.'))
    },
  })
}

export function useUpdateInvestmentMutation(id: string, data: Partial<Investment>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateInvestment(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: investmentListKey })
      toast.success('Investimento atualizado com sucesso.')
    },
    onError: (error) => {
      console.error('Error updating investment:', error)
      toast.error(getErrorMessage(error, 'Não foi possível atualizar o investimento.'))
    },
  })
}

export function useDeleteInvestmentMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteInvestment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: investmentListKey })
      toast.success('Investimento removido com sucesso.')
    },
    onError: (error) => {
      console.error('Error deleting investment:', error)
      toast.error(getErrorMessage(error, 'Não foi possível remover o investimento.'))
    },
  })
}
