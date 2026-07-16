import { useState } from 'react'
import { Button } from '#/components/ui/button'
import FreezePersonalFinanceChartPie from './charts/FreezePersonalFinanceChartPie'
import AddInvestmentDialog from './dialogs/AddInvestmentDialog'

const initialInvestmentsData = [
  {
    name: 'Poupança',
    percentage: 91.5,
    color: 'bg-orange-500',
    amount: 7184.33,
  },
  { name: 'CDB', percentage: 6.38, color: 'bg-blue-500', amount: 498.5 },
  {
    name: 'Títulos Públicos',
    percentage: 2.12,
    color: 'bg-green-500',
    amount: 166.17,
  },
]

export default function FreezePersonalFinanceInvestments() {
  const [investmentsData, setInvestmentsData] = useState(initialInvestmentsData)

  return (
    <div>
      <FreezePersonalFinanceChartPie />

      <div className="flex flex-col gap-3">
        <AddInvestmentDialog
          onAddInvestment={(investment) =>
            setInvestmentsData((current) => [
              ...current,
              {
                name: investment.name,
                percentage: 0,
                color: 'bg-slate-500',
                amount:
                  Number(
                    investment.amount
                      .replace(/[^\d,\.]/g, '')
                      .replace(',', '.'),
                  ) || 0,
              },
            ])
          }
        />
        {investmentsData.map((investment) => (
          <div className="border border-slate-600 py-2 px-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <div
                  className={`w-4 h-4 ${investment.color} rounded-full`}
                ></div>
                <div>
                  <p className="font-semibold">{investment.name}</p>
                  <p className="text-slate-400 text-sm">
                    {investment.percentage.toFixed(2)}%
                  </p>
                </div>
              </div>
              <p className="font-semibold text-slate-100">
                R$ {investment.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
