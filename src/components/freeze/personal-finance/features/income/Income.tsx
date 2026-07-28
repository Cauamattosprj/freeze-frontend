import { Button } from '#/components/ui/button'
import type { Income } from '#/services/freeze/personal-finances/incomes'
import { LucideCalendarClock, LucideCheck } from 'lucide-react'
import { Separator } from '#/components/ui/separator'
import { useUpdateIncomeMutation } from '#/hooks/incomesHooks'
import EditIncome from './EditIncome'

interface IncomeProps {
  income: Income
}

export default function Income({ income }: IncomeProps) {
  const { mutate: updateIncome } = useUpdateIncomeMutation()

  function handleStatusUpdate() {
    const newStatus = income.status === 'RECEIVED' ? 'PENDING' : 'RECEIVED'
    updateIncome({ id: income.id!, status: newStatus })
  }

  function handleStatusButton() {
    const isReceived = income.status === 'RECEIVED'
    return (
      <Button
        type="button"
        className={`border ${isReceived ? 'border-green-600 bg-green-900/40 text-green-600' : 'border-slate-600 bg-slate-800'}`}
        onClick={handleStatusUpdate}
      >
        {isReceived ? <LucideCheck /> : <LucideCalendarClock />}
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <EditIncome income={income}>
          <button type="button" className="flex-1 rounded-lg text-left">
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
        </EditIncome>
        <div className="w-fit">{handleStatusButton()}</div>
      </div>
      <Separator className="bg-slate-600" />
    </div>
  )
}
