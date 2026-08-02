import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { getMe, login, signUp } from '#/services/freeze/user'
import type { UserLoginDTO, UserSignUpDTO } from '#/services/freeze/user'
import { setAuthState } from '#/lib/auth'

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
    },
    onError: (error) => console.error('Error making login:', error),
  })
}

export function useSignUpMutation() {
  const router = useRouter()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (userSignUpData: UserSignUpDTO) => signUp(userSignUpData),
    onSuccess: () => {
        qc.clear()
        router.navigate({ to: '/login' })
    },
    onError: (error) => console.error('Error making sign up:', error),
  })
}
