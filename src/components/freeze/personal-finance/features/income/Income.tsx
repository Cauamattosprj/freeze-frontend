import { Button } from '#/components/ui/button'
import type { Income } from '#/services/freeze/personal-finances/incomes'
import { LucideCheck } from 'lucide-react'
import { Separator } from '#/components/ui/separator'

interface IncomeProps {
  income: Income
}

export default function Income({ income }: IncomeProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex-1 rounded-lg text-left"
          // onClick={() => openIncomeEditor(index, income)}
        >
          <div className="flex items-center justify-between">
            <p className="text-lg text-slate-400">{income.label}:</p>
            <p className="font-semibold text-lg text-slate-100">
              R$ {income.amount}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Status:</p>
            <p className="text-sm text-slate-400">{income.status}</p>
          </div>
        </button>
        <div className="w-fit">
          <Button
            type="button"
            className="bg-transparent border border-slate-600"
            // onClick={() => openIncomeEditor(index, income)}
          >
            <LucideCheck />
          </Button>
        </div>
      </div>
      <Separator className="bg-slate-600" />
    </div>
  )
}
