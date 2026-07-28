import { useGetBalanceQuery } from '#/hooks/balanceHooks'
import { LucideArrowRight } from 'lucide-react'
import { useEffect } from 'react'

export default function FreezePersonalFinanceBalance() {
  const balanceQuery = useGetBalanceQuery()

  console.log(balanceQuery)

  if (balanceQuery?.data == null) {
    return "Erro ao carregar saldo";
  }

  // if (balanceQuery.isFetching) {
  //   return "Carregando saldo..."
  // }

  return (
    <div className="flex flex-col gap-2">
      <div className="panel-row-between">
        <div>
          <p className="text-label">Saldo desse mês</p>
          <p className="hero-value">R$ {balanceQuery.data.toString()}</p>
        </div>
        <div className="badge-icon">
          <LucideArrowRight className="h-6 w-6" />
        </div>
      </div>
      <div className='flex gap-4 justify-between'>
        <div>
          <p className="text-label-sm">Saldo livre após despesas fixas e investimentos</p>
          <p className="text-sm font-semibold text-green-200">R$ EM BREVE (XX%)</p>
        </div>
      </div>
    </div>
  )
}
