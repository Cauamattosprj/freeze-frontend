import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { checkTokenValidity, logout } from '#/services/freeze/auth'
import { setAuthState } from '#/lib/auth'

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/login'
    },
    onError: (error) => console.error('Error making logout:', error),
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
