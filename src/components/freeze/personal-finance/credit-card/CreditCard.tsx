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

export interface CardData {
  brand: string
  title: string
  name: string
  limit: number
  currentUsage: number
  dueDate: string
}

interface CreditCardProps {
  card: CardData
  onSave: (card: CardData) => void
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

export default function CreditCard({
  card,
  createMode = false,
}: CreditCardProps) {
  const [open, setOpen] = React.useState(false)
  const form = useForm<{
    brand: string
    title: string
    name: string
    limit: string
    currentUsage: string
    dueDate: string
  }>({
    defaultValues: {
      brand: createMode ? '' : card.brand,
      title: createMode ? '' : card.title,
      name: createMode ? '' : card.name,
      limit: createMode ? '' : String(card.limit),
      currentUsage: createMode ? '' : String(card.currentUsage),
      dueDate: createMode ? '' : card.dueDate,
    },
  })

  const { handleSubmit, reset, watch } = form

  React.useEffect(() => {
    if (createMode) {
      reset({
        brand: '',
        title: '',
        name: '',
        limit: '',
        currentUsage: '',
        dueDate: '',
      })
      return
    }
    reset({
      brand: card.brand,
      title: card.title,
      name: card.name,
      limit: String(card.limit),
      currentUsage: String(card.currentUsage),
      dueDate: card.dueDate,
    })
  }, [card, createMode])

  const watchedLimit = watch('limit')
  const watchedUsage = watch('currentUsage')
  const usagePercent =
    parseCurrency(String(watchedLimit || card.limit)) > 0
      ? Math.round(
          (parseCurrency(String(watchedUsage || card.currentUsage)) /
            parseCurrency(String(watchedLimit || card.limit))) *
            100,
        )
      : 0

  function onSubmit(values: {
    brand: string
    title: string
    name: string
    limit: string
    currentUsage: string
    dueDate: string
  }) {
    const limitValue = parseCurrency(values.limit)
    const usageValue = parseCurrency(values.currentUsage)

    console.log('Submitting card data:', values)

    setOpen(false)
  }

  function handleContent() {
    if (createMode) {
      return (
        <button
          type="button"
          className="limit-card cursor-pointer border border-slate-700/80 bg-slate-900/70"
        >
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1 text-sm text-slate-200">
              <Plus className="h-4 w-4" />
              <span>Novo cartão</span>
            </div>
            <p className="text-lg font-semibold text-slate-100">Novo cartão</p>
          </div>
        </button>
      )
    }

    if (!createMode) {
      return (
        <div className="limit-card cursor-pointer">
          <div className="limit-card-brand">
            <LucideCreditCard className="h-4 w-4" />
            {brand}
          </div>
          <div className="limit-card-label">
            <span>{title}</span>
            <span className="font-semibold text-slate-100">{name}</span>
          </div>
          <div className="limit-status">
            <span>Uso atual {formatCurrency(card.currentUsage)}</span>
            <span className="font-semibold text-slate-100">
              {usagePercent}%
            </span>
          </div>
          <div className="limit-bar">
            <div
              className="limit-bar-fill"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Limite {formatCurrency(card.limit)}</span>
            <span>{formatDueDateLabel(card.dueDate)}</span>
          </div>
        </div>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{handleContent()}</DialogTrigger>

      <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
        <DialogHeader>
          <DialogTitle>
            {createMode ? 'Novo cartão' : 'Editar cartão'}
          </DialogTitle>
          <DialogDescription>
            {createMode
              ? 'Preencha os dados do novo cartão para adicioná-lo à lista.'
              : 'Ajuste os detalhes do cartão e o uso atual para atualizar o percentual dinamicamente.'}
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
              name="title"
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identificação</FormLabel>
                  <FormControl>
                    <Input
                      id="card-name"
                      placeholder="Visa Platinum"
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
              name="currentUsage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uso atual</FormLabel>
                  <FormControl>
                    <Input
                      id="card-usage"
                      type="number"
                      step="0.01"
                      placeholder="6500"
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
