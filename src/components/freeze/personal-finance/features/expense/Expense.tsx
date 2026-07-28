import { Button } from '#/components/ui/button'
import type { Expense } from '#/services/freeze/personal-finances/expenses'
import { LucideCalendarClock, LucideCheck } from 'lucide-react'
import { Separator } from '#/components/ui/separator'
import { useUpdateExpenseMutation } from '#/hooks/expensesHooks'
import EditExpense from './EditExpense'

interface ExpenseProps {
  expense: Expense
}

export default function Expense({ expense }: ExpenseProps) {
  const { mutate: updateExpense } = useUpdateExpenseMutation()

  function handleStatusUpdate() {
    const newStatus = expense.status === 'PAID' ? 'PENDING' : 'PAID'
    updateExpense({ id: expense.id!, status: newStatus })
  }

  function handleStatusButton() {
    const isPaid = expense.status === 'PAID'
    return (
      <Button
        type="button"
        className={`border ${isPaid ? 'border-green-600 bg-green-900/40 text-green-600' : 'border-slate-600 bg-slate-800'}`}
        onClick={handleStatusUpdate}
      >
        {isPaid ? <LucideCheck /> : <LucideCalendarClock />}
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <EditExpense expense={expense}>
          <button type="button" className="flex-1 rounded-lg text-left">
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
        </EditExpense>
        <div className="w-fit">{handleStatusButton()}</div>
      </div>
      <Separator className="bg-slate-600" />
    </div>
  )
}
