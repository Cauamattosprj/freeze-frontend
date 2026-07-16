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

interface AddInvestmentDialogProps {
  onAddInvestment: (investment: {
    name: string
    amount: string
    date: string
  }) => void
}

export default function AddInvestmentDialog({
  onAddInvestment,
}: AddInvestmentDialogProps) {
  const [name, setName] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [date, setDate] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !amount.trim()) {
      return
    }

    onAddInvestment({
      name: name.trim(),
      amount: amount.trim(),
      date: date ? date : 'Hoje',
    })

    setName('')
    setAmount('')
    setDate('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent border border-slate-600 w-full">
          Adicionar aporte
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
        <DialogHeader>
          <DialogTitle>Adicionar aporte</DialogTitle>
          <DialogDescription>
            Preencha os dados do aporte para exibição na aba de economias.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="investment-name">Nome</Label>
            <Input
              id="investment-name"
              placeholder="Poupança"
              className="border-slate-600"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="investment-amount">Valor</Label>
            <Input
              id="investment-amount"
              placeholder="R$ 0,00"
              className="border-slate-600"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="investment-date">Data</Label>
            <Input
              id="investment-date"
              type="date"
              className="border-slate-600"
              value={date}
              onChange={(event) => setDate(event.target.value)}
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
