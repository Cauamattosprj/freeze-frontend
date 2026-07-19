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
import type { CreditCard } from '#/services/freeze/personal-finances/creditCards'

export default function AddCreditCard() {
  const [open, setOpen] = React.useState(false)
  const form = useForm<CreditCard>()
  const { handleSubmit } = form

  function onSubmit(values: CreditCard) {
    console.log(values)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Adicionar cartão</div>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Adicionar cartão</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo cartão
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
                    <Input placeholder="Visa" {...field} />
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
                    <Input placeholder="Cartão principal" {...field} />
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
                  <FormLabel>Titular</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do titular" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="0000 0000 0000 0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="expiry"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validade</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/AA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cvv"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
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
                      type="number"
                      step="0.01"
                      placeholder="10000"
                      {...field}
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
                  <FormLabel>Data de vencimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
