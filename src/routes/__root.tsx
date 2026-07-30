import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import '../styles.css'
import { TooltipProvider } from '#/components/ui/tooltip'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <TooltipProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </TooltipProvider>
  )
}
