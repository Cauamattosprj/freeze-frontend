import { FreezeDashboard } from '#/components/freeze/FreezeDashboard'
import FreezeHeader from '#/components/freeze/FreezeHeader'
import { FreezePersonalFinanceRoot } from '#/components/freeze/personal-finance/FreezePersonalFinanceRoot'
import { createFileRoute } from '@tanstack/react-router'
import { FreezeNotes, FreezeStudy } from '../index'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {


  return (
    <main className="layout-shell">
      <div className="layout-stack">
        <FreezeHeader />
        <FreezeDashboard />
        <FreezePersonalFinanceRoot />
        <div className="panel-grid">
          <FreezeNotes />
          <FreezeStudy />
        </div>
      </div>
    </main>
  )
}
