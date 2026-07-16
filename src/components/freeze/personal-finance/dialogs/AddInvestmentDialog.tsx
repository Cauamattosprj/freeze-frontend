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
  const form = useForm<{ name: string; amount: string; date: string }>({
    defaultValues: { name: '', amount: '', date: '' },
  })

  const { handleSubmit, reset } = form

  function onSubmit(values: { name: string; amount: string; date: string }) {
    if (!values.name.trim() || !values.amount.trim()) return

    onAddInvestment({
      name: values.name.trim(),
      amount: values.amount.trim(),
      date: values.date ? values.date : 'Hoje',
    })

    reset()
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="investment-name"
                      placeholder="Poupança"
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
                      id="investment-amount"
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
                      id="investment-date"
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
