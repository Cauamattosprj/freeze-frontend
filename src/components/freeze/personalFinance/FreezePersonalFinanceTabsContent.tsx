import { Button } from '#/components/ui/button'
import { LucideCreditCard, LucideCheck } from 'lucide-react'
import { Separator } from '#/components/ui/separator'
import FreezePersonalFinanceInvestments from './FreezePersonalFinanceInvestments'

const cardData = [
  {
    brand: 'Visa',
    title: 'Cartão principal',
    limit: 'R$ 10.000',
    currentUsage: 'R$ 6.500',
    usagePercent: 65,
    invoice: 'R$ 2.150',
    dueIn: 'Vence em 15 dias',
  },
  {
    brand: 'Mastercard',
    title: 'Cartão secundário',
    limit: 'R$ 8.000',
    currentUsage: 'R$ 2.900',
    usagePercent: 36,
    invoice: 'R$ 1.850',
    dueIn: 'Vence em 20 dias',
  },
]

const incomeData = [
  {
    label: 'Renda principal',
    amount: 'R$ 3.325,00',
    status: 'A receber (06/07)',
  },
  {
    label: 'Horas extras',
    amount: 'R$ 768,00',
    status: 'A receber (06/07)',
  },
]

const expenseData = [
  {
    label: 'Cartão Inter',
    amount: 'R$ 1.108,32',
    status: 'A pagar',
    due: '06/07/2026',
  },
  {
    label: 'Cartão C6',
    amount: 'R$ 302,14',
    status: 'A pagar',
    due: '14/07/2026',
  },
  {
    label: 'Cartão Nubank',
    amount: 'R$ 520,75',
    status: 'A pagar',
    due: '18/07/2026',
  },
  {
    label: 'Cartão Santander',
    amount: 'R$ 789,90',
    status: 'A pagar',
    due: '22/07/2026',
  },
  {
    label: 'Cartão Bradesco',
    amount: 'R$ 423,33',
    status: 'A pagar',
    due: '30/07/2026',
  },
]

export default function FreezePersonalFinanceTabsContent({
  view,
}: {
  view: 'income' | 'expenses' | 'cards' | 'economies'
}) {
  return (
    <div>
      {view === 'cards' && (
        <div className="credit-card-row">
          {cardData.map((card) => (
            <div className="limit-card" key={card.title}>
              <div className="limit-card-brand">
                <LucideCreditCard className="h-4 w-4" />
                {card.brand}
              </div>
              <div className="limit-card-label">
                <span>{card.title}</span>
                <span className="font-semibold text-slate-100">
                  Limite {card.limit}
                </span>
              </div>
              <div className="limit-status">
                <span>Uso atual {card.currentUsage}</span>
                <span className="font-semibold text-slate-100">
                  {card.usagePercent}%
                </span>
              </div>
              <div className="limit-bar">
                <div
                  className="limit-bar-fill"
                  style={{ width: `${card.usagePercent}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Fatura: {card.invoice}</span>
                <span>{card.dueIn}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'income' && (
        <div className="flex flex-col gap-4">
          {incomeData.map((income) => (
            <div className="flex flex-col gap-3" key={income.label}>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-slate-400">{income.label}:</p>
                    <p className="font-semibold text-lg text-slate-100">
                      {income.amount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Status:</p>
                    <p className="text-sm text-slate-400">{income.status}</p>
                  </div>
                </div>
                <div className="w-fit">
                  <Button className="bg-transparent border border-slate-600">
                    <LucideCheck />
                  </Button>
                </div>
              </div>
              <Separator className="bg-slate-600" />
            </div>
          ))}

          <Button className="bg-transparent border border-slate-600">
            Adicionar renda
          </Button>
        </div>
      )}

      {view === 'expenses' && (
        <div className="flex flex-col gap-4">
          {expenseData.map((expense, index) => (
            <div className="flex flex-col gap-3" key={expense.label}>
              <div
                className="flex items-center gap-4"
                key={`${expense.label}-${index}`}
              >
                <div className="w-full">
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
                    <p className="text-sm text-slate-400">{expense.due}</p>
                  </div>
                </div>
                <div className="w-fit">
                  <Button className="bg-transparent border border-slate-600">
                    <LucideCheck />
                  </Button>
                </div>
              </div>
              <Separator className="bg-slate-600" />
            </div>
          ))}

          <Button className="bg-transparent border border-slate-600">
            Adicionar despesa
          </Button>
        </div>
      )}

      {view === 'economies' && (
        <div className="flex flex-col gap-4">
          <FreezePersonalFinanceInvestments />
        </div>
      )}
    </div>
  )
}
