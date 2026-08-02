import { useGetMeQuery } from '#/hooks/userHooks'

export function FreezeDashboard() {
  const meQuery = useGetMeQuery()

  return (
    <section className="surface-card">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-label">Dashboard</p>
          <h2 className="mt-3 text-heading-2">Olá, {meQuery.data?.fullName ?? '...'}</h2>
          <h2 className="">Your overview</h2>
        </div>
      </div>
    </section>
  )
}