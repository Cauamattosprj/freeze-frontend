import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { getMe, login, signUp } from '#/services/freeze/user'
import type { UserLoginDTO, UserSignUpDTO } from '#/services/freeze/user'
import { setAuthState } from '#/lib/auth'
import { getErrorMessage } from '#/lib/utils'

const meKey = ['me'] as const

export function useGetMeQuery() {
  return useQuery({
    queryKey: meKey,
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  })
}

export function useLoginMutation() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (loginData: UserLoginDTO) => login(loginData),
    onSuccess: () => {
      qc.clear()
      setAuthState(true)
      router.invalidate()
      router.navigate({ to: '/app' })
      toast.success('Login realizado com sucesso.')
    },
    onError: (error) => {
      console.error('Error making login:', error)
      const message = getErrorMessage(error)
      toast.error(/unauthorized|bad credentials/i.test(message) ? 'Email ou senha inválidos.' : message)
    },
  })
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: (userSignUpData: UserSignUpDTO) => signUp(userSignUpData),
    onSuccess: () => {
      toast.success('Conta criada com sucesso. Faça login para continuar.')
    },
    onError: (error) => {
      console.error('Error making sign up:', error)
      toast.error(getErrorMessage(error, 'Não foi possível criar a conta.'))
    },
  })
}
