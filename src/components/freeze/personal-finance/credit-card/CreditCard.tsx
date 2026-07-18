'use client'

import * as React from 'react'
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

interface CreditCardProps {
  card: CreditCard
  createMode?: boolean
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
  const cardExpenses = useGetExpensesByCreditCardQuery(card.id)
  const [open, setOpen] = useState(false)
  const form = useForm<CreditCard>()

  const { handleSubmit } = form
  const cardUsage = () => {
    return (
      card.limit -
      cardExpenses.reduce((total, expense) => total + expense.amount, 0)
    )
  }

  const cardUsagePercentage = () => {
    const limit = card.limit
    const usage = cardUsage()
    return Math.round((usage / limit) * 100)
  }

  // const watchedLimit = watch('limit')
  // const watchedUsage = watch('currentUsage')

  // const usagePercent =
  //   parseCurrency(String(card.limit || card?.limit)) > 0
  //     ? Math.round(
  //         (parseCurrency(String(watchedUsage || card.currentUsage)) /
  //           parseCurrency(String(watchedLimit || card.limit))) *
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="limit-card cursor-pointer">
          <div className="limit-card-brand">
            <LucideCreditCard className="h-4 w-4" />
            {card.brand}
          </div>
          <div className="limit-card-label">
            <span>{card.label}</span>
            <span className="font-semibold text-slate-100">
              {card.holderName}
            </span>
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
            <span>Limite {formatCurrency(card.limit)}</span>
            <span>{formatDueDateLabel(card.dueDate)}</span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
        <DialogHeader>
          <DialogTitle>{'Editar cartão'}</DialogTitle>
          <DialogDescription>
            Ajuste os detalhes do cartão
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              name="brand"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bandeira</FormLabel>
                  <FormControl>
                    <Input
                      id="card-brand"
                      placeholder="Visa"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do cartão</FormLabel>
                  <FormControl>
                    <Input
                      id="card-title"
                      placeholder="Cartão principal"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="holderName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identificação</FormLabel>
                  <FormControl>
                    <Input
                      id="card-name"
                      placeholder="Cartão principal"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="limit"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limite</FormLabel>
                  <FormControl>
                    <Input
                      id="card-limit"
                      type="number"
                      step="0.01"
                      placeholder="10000"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dueDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do vencimento</FormLabel>
                  <FormControl>
                    <Input
                      id="card-due-date"
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
