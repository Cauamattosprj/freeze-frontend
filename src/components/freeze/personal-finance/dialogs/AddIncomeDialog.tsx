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

interface AddIncomeDialogProps {
  onAddIncome: (income: {
    label: string
    amount: string
    status: string
  }) => void
}

export default function AddIncomeDialog({ onAddIncome }: AddIncomeDialogProps) {
  const form = useForm<{ label: string; amount: string; date: string }>({
    defaultValues: { label: '', amount: '', date: '' },
  })

  const { handleSubmit, reset } = form

  function onSubmit(values: { label: string; amount: string; date: string }) {
    if (!values.label.trim() || !values.amount.trim()) return

    const status = values.date ? `A receber (${values.date})` : 'A receber'

    onAddIncome({
      label: values.label.trim(),
      amount: values.amount.trim(),
      status,
    })

    reset()
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
                      id="income-label"
                      placeholder="Renda principal"
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
                      id="income-amount"
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
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      id="income-date"
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
                <Button variant={'secondary'}>Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
