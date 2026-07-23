import { useForm } from 'react-hook-form'
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '#/components/ui/form'
import { LucideCreditCard, Plus } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
  useGetCreditCardQuery,
  useGetCreditCardsQuery,
} from '#/hooks/creditCardsHooks'
import type { CreditCard } from '#/services/freeze/personal-finances/creditCards'
import { useEffect, useState } from 'react'
import { useGetExpensesByCreditCardQuery } from '#/hooks/expensesHooks'

interface CreditCardProps {
  card: CreditCard
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function formatDueDateLabel(dueDate: string) {
  if (!dueDate) {
    return 'Sem vencimento'
  }

  const date = new Date(dueDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `Vence em ${day}/${month}/${year}`
}

function parseCurrency(value: string) {
  const normalized = value.replace(/[^\d,\.]/g, '').replace(',', '.')
  return Number(normalized) || 0
}

export default function CreditCard({ card }: CreditCardProps) {
  const cardExpenses = useGetExpensesByCreditCardQuery(card.id as string)
  const [open, setOpen] = useState(false)
  const form = useForm<CreditCard>()
  console.log('card', card)
  console.log('cardExpenses', cardExpenses)

  const { handleSubmit } = form
  const cardUsage = () => {
    if (!cardExpenses.data) {
      return card.limitAmount
    }

    return (
      card.limitAmount -
      cardExpenses?.data.reduce((total, expense) => total + expense.amount, 0)
    )
  }

  const cardUsagePercentage = () => {
    const limit = card.limitAmount
    const usage = cardUsage()
    return Math.round((usage / limit) * 100)
  }

  // const watchedLimit = watch('limit')
  // const watchedUsage = watch('currentUsage')

  // const usagePercent =
  //   parseCurrency(String(card.limitAmount || card?.limit)) > 0
  //     ? Math.round(
  //         (parseCurrency(String(watchedUsage || card.currentUsage)) /
  //           parseCurrency(String(watchedLimit || card.limitAmount))) *
  //           100,
  //       )
  //     : 0

  function onSubmit(values: CreditCard) {
    // const limitValue = parseCurrency(values.limit)
    // const usageValue = parseCurrency(values.currentUsage)

    console.log('Submitting card data:', values)

    setOpen(false)
  }

  return (
    <div className="limit-card">
      <div className="limit-card-brand">
        <LucideCreditCard className="h-4 w-4" />
        {card.brand}
      </div>
      <div className="limit-card-label">
        <span>{card.label}</span>
        <span className="font-semibold text-slate-100">{card.holderName}</span>
      </div>
      <div className="limit-status">
        <span>Uso atual {cardUsage()}</span>
        <span className="font-semibold text-slate-100">
          {cardUsagePercentage()}%
        </span>
      </div>
      <div className="limit-bar">
        <div
          className="limit-bar-fill"
          style={{ width: `${cardUsagePercentage}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Limite {formatCurrency(card.limitAmount)}</span>
        <span>{formatDueDateLabel(card.dueDate)}</span>
      </div>
    </div>
  )
}
