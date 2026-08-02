import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { toast } from 'sonner'

import '../styles.css'
import { TooltipProvider } from '#/components/ui/tooltip'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '#/components/ui/sonner'
import { useAuthInit } from '#/hooks/authHooks'
import { getErrorMessage } from '#/lib/utils'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(getErrorMessage(error, 'Erro desconhecido.'))
      },
    }),
  })
  useAuthInit()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <main className="layout-shell">
          <div className="layout-stack ">
            <Outlet />
          </div>
        </main>
        <Toaster position="bottom-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
