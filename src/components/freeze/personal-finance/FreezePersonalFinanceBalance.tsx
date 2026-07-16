import { LucideArrowRight } from 'lucide-react'

export default function FreezePersonalFinanceBalance() {
  return (
    <div className="flex flex-col gap-2">
      <div className="panel-row-between">
        <div>
          <p className="text-label">Saldo desse mês</p>
          <p className="hero-value">R$ 4138,12</p>
        </div>
        <div className="badge-icon">
          <LucideArrowRight className="h-6 w-6" />
        </div>
      </div>
      <div className='flex gap-4 justify-between'>
        <div>
          <p className="text-label-sm">Saldo livre após despesas fixas e investimentos</p>
          <p className="text-sm font-semibold text-green-200">R$ 381,00 (13%)</p>
        </div>
      </div>
    </div>
  )
}
