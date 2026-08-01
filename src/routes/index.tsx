import { FreezeDashboard } from '#/components/freeze/FreezeDashboard'
import FreezeHeader from '#/components/freeze/FreezeHeader'
import { FreezePersonalFinanceRoot } from '#/components/freeze/personal-finance/FreezePersonalFinanceRoot'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })


function Home() {
  return (
      Home
  )
}

export function FreezeNotes() {
  return (
    <section className="rounded-[28px] border border-slate-800/70 bg-slate-900/65 p-6 shadow-lg shadow-slate-950/15 ring-1 ring-sky-400/10">
      <p className="text-sm uppercase tracking-[0.28em] text-sky-200/70">
        Notes
      </p>
      <p className="mt-4 text-lg leading-7 text-slate-200">
        Take notes and keep track of your ideas in a calm blue workspace.
      </p>
    </section>
  )
}

export function FreezeStudy() {
  return (
    <section className="rounded-[28px] border border-slate-800/70 bg-slate-900/65 p-6 shadow-lg shadow-slate-950/15 ring-1 ring-sky-400/10">
      <p className="text-sm uppercase tracking-[0.28em] text-sky-200/70">
        Study
      </p>
      <p className="mt-4 text-lg leading-7 text-slate-200">
        Study and learn new things here with a minimal and focused layout.
      </p>
    </section>
  )
}
