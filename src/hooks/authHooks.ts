import { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { checkTokenValidity } from '#/services/freeze/auth'
import { setAuthState } from '#/lib/auth'

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
