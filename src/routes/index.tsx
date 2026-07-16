import { FreezePersonalFinanceRoot } from '#/components/freeze/personal-finance/FreezePersonalFinanceRoot'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import {
  LucideArrowRight,
  LucideCheck,
  LucideCreditCard,
  LucideDollarSign,
  LucideMinus,
  LucidePlus,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
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

export default function FreezeHeader() {
  return (
    <section className="surface-card surface-card-soft">
      <div className="w-full text-center">
        <h1 className="text-xl font-semibold">Freeze</h1>
      </div>
    </section>
  )
}

export function FreezeDashboard() {
  return (
    <section className="surface-card">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-label">Dashboard</p>
          <h2 className="mt-3 text-heading-2">Your overview</h2>
        </div>
      </div>
    </section>
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
