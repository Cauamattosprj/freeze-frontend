import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { checkTokenValidity, logout } from '#/services/freeze/auth'
import { setAuthState } from '#/lib/auth'
import { getErrorMessage } from '#/lib/utils'

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/login'
    },
    onError: (error) => {
      console.error('Error making logout:', error)
      window.location.href = '/login'
      toast.error(getErrorMessage(error, 'Não foi possível sair. Tente novamente.'))
    },
  })
}

export function useAuthInit() {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      const valid = await checkTokenValidity()
      if (cancelled) return
      setAuthState(valid)
      router.invalidate()
    }

    init()

    return () => {
      cancelled = true
    }
  }, [router])
}
