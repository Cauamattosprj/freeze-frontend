import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import { setUnauthorizedHandler } from '#/services/httpClient'
import { setAuthState } from '#/lib/auth'

const router = getRouter()

setUnauthorizedHandler(() => {
  setAuthState(false)
  router.navigate({ to: '/login' })
})

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
