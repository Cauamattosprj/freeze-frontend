import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getBalance,
  type Balance,
} from '#/services/freeze/personal-finances/balance'

const balanceListKey = ['balance']
const balanceKey = ['balance'] as const

export function useGetBalanceQuery() {
  return useQuery({ queryKey: balanceKey, queryFn: getBalance })
}
