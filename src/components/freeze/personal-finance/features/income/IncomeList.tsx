import { useGetIncomesQuery } from '#/hooks/incomesHooks'
import AddIncome from './AddIncome'
import Income from './Income'

export default function IncomesList() {
  const incomes = useGetIncomesQuery()

  if (!incomes.data)
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
