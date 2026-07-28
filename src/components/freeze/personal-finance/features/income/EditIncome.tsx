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
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '#/components/ui/dialog'
import type { Income } from '#/services/freeze/personal-finances/incomes'
import {
  useCreateIncomeMutation,
  useDeleteIncomeMutation,
  useUpdateIncomeMutation,
} from '#/hooks/incomesHooks'

export default function EditIncome({
  children,
  income,
}: {
  children: React.ReactNode
  income: Income
}) {
  const [open, setOpen] = React.useState(false)
  const form = useForm<Income>({
    defaultValues: {
      id: income.id,
      amount: income.amount,
      category: income.category,
      dueDate: income.dueDate,
      label: income.label,
      status: income.status,
    },
  })
  const { handleSubmit } = form
  const updateMutation = useUpdateIncomeMutation()
  const deleteMutation = useDeleteIncomeMutation()

  function onSubmit(incomeData: Income) {
    console.log(incomeData)
    updateMutation.mutate(incomeData)
    setOpen(false)
  }

  function handleDelete() {
    console.log('Usuario deletou', income.id)
    deleteMutation.mutate(income.id as string)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar receita - {income.label}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da receita" {...field} />
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
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="pending / received" {...field} />
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
                  <FormLabel>Data de vencimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Categoria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Salvar</Button>
            <Button variant={'destructive'} onClick={() => handleDelete()}>
              Excluir
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
