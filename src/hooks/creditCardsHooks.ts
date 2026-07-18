import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCreditCards,
  getCreditCard,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
  type CreditCard,
} from '#/services/freeze/personal-finances/creditCards'

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

  return useMutation({mutationFn: createCreditCard, onSuccess: () => qc.invalidateQueries({queryKey: cardListKey})})
}

export function useUpdateCreditCardMutation(id: string, data: Partial<CreditCard>) {
  const qc = useQueryClient()

  return useMutation({mutationFn: () => updateCreditCard(id, data), onSuccess: () => qc.invalidateQueries({queryKey: cardListKey})})
}

export function useDeleteCreditCardMutation() {
  const qc = useQueryClient()

  return useMutation({mutationFn: deleteCreditCard, onSuccess: () => qc.invalidateQueries({queryKey: cardListKey})})
}