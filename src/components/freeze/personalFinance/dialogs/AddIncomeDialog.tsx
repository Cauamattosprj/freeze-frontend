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

interface AddIncomeDialogProps {
  onAddIncome: (income: {
    label: string
    amount: string
    status: string
  }) => void
}

export default function AddIncomeDialog({ onAddIncome }: AddIncomeDialogProps) {
  const [label, setLabel] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [date, setDate] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!label.trim() || !amount.trim()) {
      return
    }

    const status = date ? `A receber (${date})` : 'A receber'

    onAddIncome({
      label: label.trim(),
      amount: amount.trim(),
      status,
    })

    setLabel('')
    setAmount('')
    setDate('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent border border-slate-600 w-full">
          Adicionar renda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
        <DialogHeader>
          <DialogTitle>Adicionar renda</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova renda para exibição na aba de receitas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="income-label">Descrição</Label>
            <Input
              id="income-label"
              placeholder="Renda principal"
              className="border-slate-600"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="income-amount">Valor</Label>
            <Input
              id="income-amount"
              placeholder="R$ 0,00"
              className="border-slate-600"

              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="income-date">Data</Label>
            <Input
              id="income-date"
              type="date"
              className="border-slate-600"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'secondary'}>Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
