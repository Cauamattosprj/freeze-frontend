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
  const form = useForm<{ label: string; amount: string; due: string }>({
    defaultValues: { label: '', amount: '', due: '' },
  })

  const { handleSubmit, reset } = form

  function onSubmit(values: { label: string; amount: string; due: string }) {
    if (!values.label.trim() || !values.amount.trim()) return

    onAddExpense({
      label: values.label.trim(),
      amount: values.amount.trim(),
      status: 'A pagar',
      due: values.due ? formatDate(values.due) : '',
    })

    reset()
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      id="expense-label"
                      placeholder="Cartão Inter"
                      className="border-slate-600"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      id="expense-amount"
                      placeholder="R$ 0,00"
                      className="border-slate-600"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="due"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vencimento</FormLabel>
                  <FormControl>
                    <Input
                      id="expense-due"
                      type="date"
                      className="border-slate-600"
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
