import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getCreditCards,
  getCreditCard,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
  type CreditCard,
} from '#/services/freeze/personal-finances/creditCards'
import { getErrorMessage } from '#/lib/utils'

const cardListKey = ['creditCards']
const cardKey = (id: string | undefined) => ['creditCard', id] as const

export function useGetCreditCardsQuery() {
  return useQuery({ queryKey: cardListKey, queryFn: getCreditCards })
}

export function useGetCreditCardQuery(id?: string) {
  return useQuery({ queryKey: cardKey(id), queryFn: () => getCreditCard(id as string) })
}

export function useCreateCreditCardMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createCreditCard,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: cardListKey })
      toast.success('Cartão criado com sucesso.')
    },
    onError: (error) => {
      console.error('Error creating credit card:', error)
      toast.error(getErrorMessage(error, 'Não foi possível criar o cartão.'))
    },
  })
}

export function useUpdateCreditCardMutation(id: string, data: Partial<CreditCard>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => updateCreditCard(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: cardListKey })
      toast.success('Cartão atualizado com sucesso.')
    },
    onError: (error) => {
      console.error('Error updating credit card:', error)
      toast.error(getErrorMessage(error, 'Não foi possível atualizar o cartão.'))
    },
  })
}

export function useDeleteCreditCardMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteCreditCard,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: cardListKey })
      toast.success('Cartão removido com sucesso.')
    },
    onError: (error) => {
      console.error('Error deleting credit card:', error)
      toast.error(getErrorMessage(error, 'Não foi possível remover o cartão.'))
    },
  })
}
