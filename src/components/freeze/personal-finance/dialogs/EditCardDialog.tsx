'use client'

import * as React from 'react'
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

interface EditCardDialogProps {
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

export default function EditCardDialog({
  card,
  onSave,
  createMode = false,
}: EditCardDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [brand, setBrand] = React.useState(createMode ? '' : card.brand)
  const [title, setTitle] = React.useState(createMode ? '' : card.title)
  const [name, setName] = React.useState(createMode ? '' : card.name)
  const [limit, setLimit] = React.useState(createMode ? '' : String(card.limit))
  const [currentUsage, setCurrentUsage] = React.useState(
    createMode ? '' : String(card.currentUsage),
  )
  const [dueDate, setDueDate] = React.useState(createMode ? '' : card.dueDate)

  React.useEffect(() => {
    if (createMode) {
      setBrand('')
      setTitle('')
      setName('')
      setLimit('')
      setCurrentUsage('')
      setDueDate('')
      return
    }

    setBrand(card.brand)
    setTitle(card.title)
    setName(card.name)
    setLimit(String(card.limit))
    setCurrentUsage(String(card.currentUsage))
    setDueDate(card.dueDate)
  }, [card, createMode])

  const usagePercent =
    card.limit > 0 ? Math.round((card.currentUsage / card.limit) * 100) : 0

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const limitValue = parseCurrency(limit)
    const usageValue = parseCurrency(currentUsage)

    onSave({
      brand: brand.trim() || card.brand,
      title: title.trim() || card.title,
      name: name.trim() || card.name,
      limit: limitValue,
      currentUsage: usageValue,
      dueDate,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {createMode ? (
          <button
            type="button"
            className="limit-card cursor-pointer border border-slate-700/80 bg-slate-900/70"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1 text-sm text-slate-200">
                <Plus className="h-4 w-4" />
                <span>Novo cartão</span>
              </div>
              <p className="text-lg font-semibold text-slate-100">
                Novo cartão
              </p>
            </div>
          </button>
        ) : (
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
        )}
      </DialogTrigger>

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

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="card-brand">Bandeira</Label>
            <Input
              id="card-brand"
              placeholder="Visa"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-title">Nome do cartão</Label>
            <Input
              id="card-title"
              placeholder="Cartão principal"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-name">Identificação</Label>
            <Input
              id="card-name"
              placeholder="Visa Platinum"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-limit">Limite</Label>
            <Input
              id="card-limit"
              type="number"
              step="0.01"
              placeholder="10000"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-usage">Uso atual</Label>
            <Input
              id="card-usage"
              type="number"
              step="0.01"
              placeholder="6500"
              value={currentUsage}
              onChange={(event) => setCurrentUsage(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-due-date">Data do vencimento</Label>
            <Input
              id="card-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
