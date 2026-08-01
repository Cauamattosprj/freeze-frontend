import { useGetToken } from '#/hooks/userHooks'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  beforeLoad: () => {
    if (!useGetToken()) {
      console.log('Token is null, redirecting to login page.')
      throw redirect({ to: '/login' })
    }
    console.log("Token is valid, rendering the Freeze app.", useGetToken())
  },
  component: RouteComponent,
})

function RouteComponent() {
  // if (useGetToken() === null) {
  //   window.location.href = '/login'
  //   console.log('Token is null, redirecting to login page.')
  // } else {
  //   console.log('Token is valid, rendering the Freeze app.')
  // }

  return <Outlet />
}
