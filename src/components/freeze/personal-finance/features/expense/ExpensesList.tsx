import { Button } from '#/components/ui/button'
import { LucideCheck } from 'lucide-react'
import { Separator } from '#/components/ui/separator'
import { useGetExpensesQuery } from '#/hooks/expensesHooks'
import AddExpense from './AddExpense'

export default function ExpensesList() {
  const expenses = useGetExpensesQuery()

  if (!expenses.data) {
    return (
      <div>
        <p className="text-slate-400">Nenhuma receita cadastrada</p>
        <AddExpense />
      </div>
    )
  }

  return (
    <div>
      {expenses.data?.map((expense, index) => (
        <div className="flex flex-col gap-3" key={`${expense.label}-${index}`}>
          <div className="flex items-center gap-4">
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
      ))}
    </div>
  )
}
