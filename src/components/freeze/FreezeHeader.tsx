import { Button } from '#/components/ui/button'
import { useLogoutMutation } from '#/hooks/authHooks'
import { LucideLogOut } from 'lucide-react'

export default function FreezeHeader() {
  const logoutMutation = useLogoutMutation()

  return (
    <section className="surface-card surface-card-soft">
      <div className="panel-row-between">
        <h1 className="text-xl font-semibold">Freeze</h1>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Sair"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          <LucideLogOut className="size-5" />
        </Button>
      </div>
    </section>
  )
}
