import {
  type LucideIcon,
  LucideCreditCard,
  LucideDollarSign,
  LucideMinus,
  LucidePiggyBank,
} from 'lucide-react'
import { useState } from 'react'
import FreezePersonalFinanceTabsContent from '#/components/freeze/personal-finance/FreezePersonalFinanceTabsContent'
import type { PersonalFinanceTabs } from '#/types/personal-finances'

const tabs: Array<{ id: PersonalFinanceTabs; icon: LucideIcon }> = [
  { id: 'cards', icon: LucideCreditCard },
  { id: 'income', icon: LucideDollarSign },
  { id: 'expenses', icon: LucideMinus },
  { id: 'economies', icon: LucidePiggyBank },
]

export default function FreezePersonalFinanceTabs() {
  const [personalFinanceView, setPersonalFinanceView] =
    useState<PersonalFinanceTabs>('cards')

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 items-center justify-between gap-3">
        {tabs.map(({ id, icon: Icon }) => (
          <div
            key={id}
            className="badge-pill"
            onClick={() => setPersonalFinanceView(id)}
          >
            <Icon className="h-4 w-4" />
          </div>
        ))}
      </div>
      <FreezePersonalFinanceTabsContent view={personalFinanceView} />
    </div>
  )
}
