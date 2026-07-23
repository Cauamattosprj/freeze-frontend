import { useGetIncomesQuery } from '#/hooks/incomesHooks'
import CreateIncome from './CreateIncome'
import Income from './Income'

export default function IncomesList() {
  const incomes = useGetIncomesQuery()

  if (incomes.data?.length == 0)
    return (
      <div>
        <p className="text-slate-400">Nenhum receita cadastrada.</p>
        <CreateIncome />
      </div>
    )

  return (
    <div>
      {incomes.data?.map((income) => (
        <Income key={income.id} income={income} />
      ))}
      <CreateIncome />
    </div>
  )
}
