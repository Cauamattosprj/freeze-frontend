'use client'

import * as React from 'react'
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

interface AddExpensesDialogProps {
  onAddExpense: (expense: {
    label: string
    amount: string
    status: string
    due: string
  }) => void
}

function formatDate(dateValue: string) {
  if (!dateValue) {
    return ''
  }

  const [year, month, day] = dateValue.split('-')
  return `${day}/${month}/${year}`
}

export default function AddExpensesDialog({
  onAddExpense,
}: AddExpensesDialogProps) {
  const [label, setLabel] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [due, setDue] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!label.trim() || !amount.trim()) {
      return
    }

    onAddExpense({
      label: label.trim(),
      amount: amount.trim(),
      status: 'A pagar',
      due: due ? formatDate(due) : '',
    })

    setLabel('')
    setAmount('')
    setDue('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent border border-slate-600 w-full">
          Adicionar despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
        <DialogHeader>
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova despesa para exibição na aba de despesas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expense-label">Descrição</Label>
            <Input
              id="expense-label"
              placeholder="Cartão Inter"
              className="border-slate-600"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-amount">Valor</Label>
            <Input
              id="expense-amount"
              placeholder="R$ 0,00"
              className="border-slate-600"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-due">Vencimento</Label>
            <Input
              id="expense-due"
              type="date"
              className="border-slate-600"
              value={due}
              onChange={(event) => setDue(event.target.value)}
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
