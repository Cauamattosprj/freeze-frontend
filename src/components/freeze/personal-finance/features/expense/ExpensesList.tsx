import { useGetExpensesQuery } from '#/hooks/expensesHooks'
import CreateExpense from './CreateExpense'
import Expense from './Expense'

export default function ExpensesList() {
  const expenses = useGetExpensesQuery()

  if (expenses.data?.length == 0) {
    return (
      <div>
        <p className="text-slate-400">Nenhuma receita cadastrada</p>
        <CreateExpense />
      </div>
    )
  }

  return (
    <div>
      {expenses.data?.map((expense) => (
        <Expense key={expense.id} expense={expense} />
      ))}
    </div>
  )
}
