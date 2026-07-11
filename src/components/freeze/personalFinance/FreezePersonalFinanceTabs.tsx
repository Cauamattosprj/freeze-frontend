import { LucideCreditCard, LucideDollarSign, LucideMinus, LucidePiggyBank } from 'lucide-react'
import { useState } from 'react'
import FreezePersonalFinanceTabsContent from '#/components/freeze/personalFinance/FreezePersonalFinanceTabsContent'

export default function FreezePersonalFinanceTabs() {
  const [personalFinanceView, setPersonalFinanceView] = useState<
    'income' | 'expenses' | 'cards' | 'economies'
  >('cards')

  return (
    <div className='flex flex-col gap-4'>
      <div className="grid grid-cols-4 items-center justify-between gap-3">
        <div
          className="badge-pill"
          onClick={() => setPersonalFinanceView('cards')}
        >
          <LucideCreditCard className="h-4 w-4" />
          {/* Cartões */}
        </div>
        <div
          className="badge-pill"
          onClick={() => setPersonalFinanceView('income')}
        >
          <LucideDollarSign className="h-4 w-4" />
          {/* Receitas */}
        </div>
        <div
          className="badge-pill"
          onClick={() => setPersonalFinanceView('expenses')}
        >
          <LucideMinus className="h-4 w-4" />
          {/* Despesas */}
        </div>
        <div
          className="badge-pill"
          onClick={() => setPersonalFinanceView('economies')}
        >
          <LucidePiggyBank className="h-4 w-4" />
          {/* Economias */}
        </div>
      </div>
      <FreezePersonalFinanceTabsContent view={personalFinanceView} />
    </div>
  )
}
