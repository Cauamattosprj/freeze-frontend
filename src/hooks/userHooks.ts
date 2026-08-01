import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { getUserById, login, signUp, type UserLoginDTO, type UserSignUpDTO } from '#/services/freeze/user'
import { useEffect } from 'react';

// const userListKey = ['balance']
const userKey = ['user'] as const
let accessToken: string | null = null;

export function useGetUserByIdQuery(id: string) {
  return useQuery({ queryKey: userKey, queryFn: () => getUserById(id) })
}

export function useGetToken() {
    return accessToken;
}

export function useLoginMutation() {
    const qc = useQueryClient()

  return useMutation({ 
        mutationFn: (loginData: UserLoginDTO) => login(loginData), 
        onSuccess: (response) => {
            console.log('Login successful, received token:', response.accessToken);
            qc.invalidateQueries({ queryKey: userKey })
            accessToken = response.accessToken;
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
