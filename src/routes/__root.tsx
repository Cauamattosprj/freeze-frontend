import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import '../styles.css'
import { TooltipProvider } from '#/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetToken } from '#/hooks/userHooks'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <main className="layout-shell h-screen my-auto">
          <div className="layout-stack ">
            <Outlet />
          </div>
        </main>
        <TanStackRouterDevtools position="bottom-right" />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
