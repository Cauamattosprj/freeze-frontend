import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { checkTokenValidity } from '#/services/freeze/auth'

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    const valid = await checkTokenValidity()
    if (!valid) {
      console.log('Token is invalid, redirecting to login page.')
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
