'use client'

import { useForm } from 'react-hook-form'
import { GalleryVerticalEnd } from 'lucide-react'
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
import { Separator } from '#/components/ui/separator'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/signUp')({
  component: RouteComponent,
})

type SignUpForm = {
  name: string
  email: string
  password: string
}

function RouteComponent() {
  const form = useForm<SignUpForm>()
  const { handleSubmit } = form

  function onSubmit(values: SignUpForm) {
    console.log(values)
  }

  return (
    <div className="mx-auto flex w-full h-full max-w-sm flex-col gap-6 justify-center items-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col items-center gap-2 text-center">
            <a className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md bg-sky-500/10 ring-1 ring-sky-400/20">
                <GalleryVerticalEnd className="size-6 text-sky-300" />
              </div>
              <span className="sr-only">Freeze</span>
            </a>
            <h1 className="text-heading-2">Crie sua conta</h1>
            <p className="text-sm text-slate-300">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="font-semibold text-sky-300 transition-colors hover:text-sky-200 hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome completo"
                    className="border-slate-800 bg-slate-900/60 text-slate-100 placeholder:text-slate-500 focus-visible:border-sky-400/60 focus-visible:ring-sky-400/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    className="border-slate-800 bg-slate-900/60 text-slate-100 placeholder:text-slate-500 focus-visible:border-sky-400/60 focus-visible:ring-sky-400/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="border-slate-800 bg-slate-900/60 text-slate-100 placeholder:text-slate-500 focus-visible:border-sky-400/60 focus-visible:ring-sky-400/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Criar conta
          </Button>

          <div className="relative -my-2 flex h-5 items-center text-sm">
            <Separator className="absolute inset-x-0 top-1/2" />
            <span className="relative mx-auto block w-fit bg-slate-950 px-2 text-slate-400">
              Ou
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              className="border-slate-800 bg-slate-900/60 text-slate-100 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue com Apple
            </Button>

            <Button
              variant="outline"
              type="button"
              className="border-slate-800 bg-slate-900/60 text-slate-100 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue com Google
            </Button>
          </div>
        </form>
      </Form>

      <p className="px-6 text-center text-sm text-slate-400">
        Ao continuar, você concorda com nossos{' '}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-slate-200"
        >
          Termos de Serviço
        </a>{' '}
        e{' '}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-slate-200"
        >
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  )
}
