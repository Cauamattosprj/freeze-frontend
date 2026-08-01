import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { getUserById, login, signUp } from '#/services/freeze/user'
import type { UserLoginDTO, UserSignUpDTO } from '#/services/freeze/user'
import { setAuthState } from '#/lib/auth'

// const userListKey = ['balance']
const userKey = ['user'] as const

export function useGetUserByIdQuery(id: string) {
  return useQuery({ queryKey: userKey, queryFn: () => getUserById(id) })
}

export function useLoginMutation() {
    const qc = useQueryClient()
    const router = useRouter()

  return useMutation({ 
        mutationFn: (loginData: UserLoginDTO) => login(loginData), 
        onSuccess: () => {
            setAuthState(true)
            qc.invalidateQueries({ queryKey: userKey })
            router.invalidate()
            router.navigate({ to: '/app' })
        },
        onError: (error) => console.error('Error making login:', error),
    })
}

export function useSignUpMutation() {
    const qc = useQueryClient()

  return useMutation({ 
        mutationFn: (userSignUpData: UserSignUpDTO) => signUp(userSignUpData), 
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: userKey })
        },
        onError: (error) => console.error('Error making sign up:', error),
    })
}
