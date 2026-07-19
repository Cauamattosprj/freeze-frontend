import { useState } from 'react'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { LucideCheck, Trash2 } from 'lucide-react'
import { Separator } from '#/components/ui/separator'
import FreezePersonalFinanceInvestments from './FreezePersonalFinanceInvestments'
import CreditCard from './features/credit-card/CreditCard'
import type { PersonalFinanceTabs } from '#/types/personal-finances'
import { useGetCreditCardsQuery } from '#/hooks/creditCardsHooks'
import IncomesList from './features/income/IncomeList'
import ExpensesList from './features/expense/ExpensesList'
import CreditCardsList from './features/credit-card/CreditCardsList'

const initialCardData = [
  {
    brand: 'Visa',
    title: 'Cartão principal',
    name: 'Visa Platinum',
    limit: 10000,
    currentUsage: 6500,
    invoice: 'R$ 2.150',
    dueDate: '2026-07-15',
  },
  {
    brand: 'Mastercard',
    title: 'Cartão secundário',
    name: 'Mastercard Gold',
    limit: 8000,
    currentUsage: 2900,
    invoice: 'R$ 1.850',
    dueDate: '2026-07-20',
  },
]

const initialIncomeData = [
  {
    label: 'Renda principal',
    amount: '3.325,00',
    status: 'A receber (06/07)',
  },
  {
    label: 'Horas extras',
    amount: '768,00',
    status: 'A receber (06/07)',
  },
]

const initialExpenseData = [
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

function formatDateInput(value: string) {
  if (!value) {
    return ''
  }

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  if (!match) {
    return value
  }

  return `${match[3]}-${match[2]}-${match[1]}`
}

function formatDateDisplay(value: string) {
  if (!value) {
    return ''
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    return value
  }

  return `${match[3]}/${match[2]}/${match[1]}`
}

export default function FreezePersonalFinanceTabsContent({
  view,
}: {
  view: PersonalFinanceTabs
}) {

  const [incomeData, setIncomeData] = useState(initialIncomeData)
  const [expenseData, setExpenseData] = useState(initialExpenseData)
  const [cards, setCards] = useState(initialCardData)
  const [editingIncomeIndex, setEditingIncomeIndex] = useState<number | null>(
    null,
  )
  const [incomeDraft, setIncomeDraft] = useState({
    label: '',
    amount: '',
    status: '',
  })
  const [editingExpenseIndex, setEditingExpenseIndex] = useState<number | null>(
    null,
  )
  const [expenseDraft, setExpenseDraft] = useState({
    label: '',
    amount: '',
    status: '',
    due: '',
  })

  function closeIncomeEditor() {
    setEditingIncomeIndex(null)
    setIncomeDraft({ label: '', amount: '', status: '' })
  }

  function openIncomeEditor(
    index: number,
    income: (typeof initialIncomeData)[number],
  ) {
    setEditingIncomeIndex(index)
    setIncomeDraft({
      label: income.label,
      amount: income.amount,
      status: income.status,
    })
  }

  function saveIncome() {
    if (editingIncomeIndex === null) {
      return
    }

    const label = incomeDraft.label.trim()
    const amount = incomeDraft.amount.trim()
    const status = incomeDraft.status.trim()

    if (!label || !amount) {
      return
    }

    setIncomeData((current) =>
      current.map((item, index) =>
        index === editingIncomeIndex
          ? { ...item, label, amount, status }
          : item,
      ),
    )

    closeIncomeEditor()
  }

  function deleteIncome() {
    if (editingIncomeIndex === null) {
      return
    }

    setIncomeData((current) =>
      current.filter((_, index) => index !== editingIncomeIndex),
    )

    closeIncomeEditor()
  }

  function closeExpenseEditor() {
    setEditingExpenseIndex(null)
    setExpenseDraft({ label: '', amount: '', status: '', due: '' })
  }

  function openExpenseEditor(
    index: number,
    expense: (typeof initialExpenseData)[number],
  ) {
    setEditingExpenseIndex(index)
    setExpenseDraft({
      label: expense.label,
      amount: expense.amount,
      status: expense.status,
      due: formatDateInput(expense.due),
    })
  }

  function saveExpense() {
    if (editingExpenseIndex === null) {
      return
    }

    const label = expenseDraft.label.trim()
    const amount = expenseDraft.amount.trim()
    const status = expenseDraft.status.trim()
    const due = formatDateDisplay(expenseDraft.due)

    if (!label || !amount) {
      return
    }

    setExpenseData((current) =>
      current.map((item, index) =>
        index === editingExpenseIndex
          ? { ...item, label, amount, status, due }
          : item,
      ),
    )

    closeExpenseEditor()
  }

  function deleteExpense() {
    if (editingExpenseIndex === null) {
      return
    }

    setExpenseData((current) =>
      current.filter((_, index) => index !== editingExpenseIndex),
    )

    closeExpenseEditor()
  }

  return (
    <div>
      {view === 'cards' && (
        <div className="credit-card-row">
          <CreditCardsList />
        </div>
      )}

      {view === 'income' && (
        <div className="flex flex-col gap-4">
          <IncomesList />
        </div>
      )}

      {view === 'expenses' && (
        <div className="flex flex-col gap-4">
          <ExpensesList />
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
