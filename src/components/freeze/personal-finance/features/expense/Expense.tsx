import { Button } from '#/components/ui/button'
import type { Expense } from '#/services/freeze/personal-finances/expenses'
import { LucideCheck } from 'lucide-react'
import { Separator } from '#/components/ui/separator'

interface ExpenseProps {
  expense: Expense
}

export default function Expense({ expense }: ExpenseProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex-1 rounded-lg text-left"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg text-slate-400">{expense.label}</p>
            <p className="font-semibold text-lg text-slate-100">
              {expense.amount}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Status:</p>
            <p className="text-sm text-slate-400">{expense.status}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Vencimento:</p>
            <p className="text-sm text-slate-400">{expense.dueDate}</p>
          </div>
        </button>
        <div className="w-fit">
          <Button
            type="button"
            className="bg-transparent border border-slate-600"
          >
            <LucideCheck />
          </Button>
        </div>
      </div>
      <Separator className="bg-slate-600" />
    </div>
  )
}
