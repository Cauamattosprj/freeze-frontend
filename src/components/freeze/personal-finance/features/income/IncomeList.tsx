import { useGetIncomesQuery } from '#/hooks/incomesHooks'
import AddIncome from './AddIncome'
import Income from './Income'

export default function IncomesList() {
  const incomes = useGetIncomesQuery()

  console.log("incomes.data", incomes.data)

  if (incomes.data?.length == 0)
    return (
      <div>
        <p className="text-slate-400">Nenhum receita cadastrada.</p>
        <AddIncome />
      </div>
    )

  return incomes.data?.map((income) => (
    <Income key={income.id} income={income} />
  ))
}
