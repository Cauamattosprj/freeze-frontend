import { useState } from 'react'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { LucideCheck, Trash2 } from 'lucide-react'
import { Separator } from '#/components/ui/separator'
import FreezePersonalFinanceInvestments from './FreezePersonalFinanceInvestments'
import AddIncomeDialog from './dialogs/AddIncomeDialog'
import AddExpensesDialog from './dialogs/AddExpensesDialog'
import EditCardDialog from './dialogs/EditCardDialog'
import type { PersonalFinanceTabs } from '#/types/personal-finances'

const initialCardData = [
  {
    brand: 'Visa',
    title: 'Cartão principal',
    name: 'Visa Platinum',
    limit: 10000,
    currentUsage: 6500,
    invoice: 'R$ 2.150',
    dueDate: '2026-07-15',
  },
  {
    brand: 'Mastercard',
    title: 'Cartão secundário',
    name: 'Mastercard Gold',
    limit: 8000,
    currentUsage: 2900,
    invoice: 'R$ 1.850',
    dueDate: '2026-07-20',
  },
]

const initialIncomeData = [
  {
    label: 'Renda principal',
    amount: '3.325,00',
    status: 'A receber (06/07)',
  },
  {
    label: 'Horas extras',
    amount: '768,00',
    status: 'A receber (06/07)',
  },
]

const initialExpenseData = [
  {
    label: 'Cartão Inter',
    amount: 'R$ 1.108,32',
    status: 'A pagar',
    due: '06/07/2026',
  },
  {
    label: 'Cartão C6',
    amount: 'R$ 302,14',
    status: 'A pagar',
    due: '14/07/2026',
  },
  {
    label: 'Cartão Nubank',
    amount: 'R$ 520,75',
    status: 'A pagar',
    due: '18/07/2026',
  },
  {
    label: 'Cartão Santander',
    amount: 'R$ 789,90',
    status: 'A pagar',
    due: '22/07/2026',
  },
  {
    label: 'Cartão Bradesco',
    amount: 'R$ 423,33',
    status: 'A pagar',
    due: '30/07/2026',
  },
]

function formatDateInput(value: string) {
  if (!value) {
    return ''
  }

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  if (!match) {
    return value
  }

  return `${match[3]}-${match[2]}-${match[1]}`
}

function formatDateDisplay(value: string) {
  if (!value) {
    return ''
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    return value
  }

  return `${match[3]}/${match[2]}/${match[1]}`
}

export default function FreezePersonalFinanceTabsContent({
  view,
}: {
  view: PersonalFinanceTabs
}) {
  const [incomeData, setIncomeData] = useState(initialIncomeData)
  const [expenseData, setExpenseData] = useState(initialExpenseData)
  const [cards, setCards] = useState(initialCardData)
  const [editingIncomeIndex, setEditingIncomeIndex] = useState<number | null>(
    null,
  )
  const [incomeDraft, setIncomeDraft] = useState({
    label: '',
    amount: '',
    status: '',
  })
  const [editingExpenseIndex, setEditingExpenseIndex] = useState<number | null>(
    null,
  )
  const [expenseDraft, setExpenseDraft] = useState({
    label: '',
    amount: '',
    status: '',
    due: '',
  })

  function closeIncomeEditor() {
    setEditingIncomeIndex(null)
    setIncomeDraft({ label: '', amount: '', status: '' })
  }

  function openIncomeEditor(
    index: number,
    income: (typeof initialIncomeData)[number],
  ) {
    setEditingIncomeIndex(index)
    setIncomeDraft({
      label: income.label,
      amount: income.amount,
      status: income.status,
    })
  }

  function saveIncome() {
    if (editingIncomeIndex === null) {
      return
    }

    const label = incomeDraft.label.trim()
    const amount = incomeDraft.amount.trim()
    const status = incomeDraft.status.trim()

    if (!label || !amount) {
      return
    }

    setIncomeData((current) =>
      current.map((item, index) =>
        index === editingIncomeIndex
          ? { ...item, label, amount, status }
          : item,
      ),
    )

    closeIncomeEditor()
  }

  function deleteIncome() {
    if (editingIncomeIndex === null) {
      return
    }

    setIncomeData((current) =>
      current.filter((_, index) => index !== editingIncomeIndex),
    )

    closeIncomeEditor()
  }

  function closeExpenseEditor() {
    setEditingExpenseIndex(null)
    setExpenseDraft({ label: '', amount: '', status: '', due: '' })
  }

  function openExpenseEditor(
    index: number,
    expense: (typeof initialExpenseData)[number],
  ) {
    setEditingExpenseIndex(index)
    setExpenseDraft({
      label: expense.label,
      amount: expense.amount,
      status: expense.status,
      due: formatDateInput(expense.due),
    })
  }

  function saveExpense() {
    if (editingExpenseIndex === null) {
      return
    }

    const label = expenseDraft.label.trim()
    const amount = expenseDraft.amount.trim()
    const status = expenseDraft.status.trim()
    const due = formatDateDisplay(expenseDraft.due)

    if (!label || !amount) {
      return
    }

    setExpenseData((current) =>
      current.map((item, index) =>
        index === editingExpenseIndex
          ? { ...item, label, amount, status, due }
          : item,
      ),
    )

    closeExpenseEditor()
  }

  function deleteExpense() {
    if (editingExpenseIndex === null) {
      return
    }

    setExpenseData((current) =>
      current.filter((_, index) => index !== editingExpenseIndex),
    )

    closeExpenseEditor()
  }

  return (
    <div>
      {view === 'cards' && (
        <div className="credit-card-row">
          {cards.map((card) => (
            <EditCardDialog
              key={card.title}
              card={card}
              onSave={(updatedCard) =>
                setCards((current) =>
                  current.map((item) =>
                    item.title === card.title ? updatedCard : item,
                  ),
                )
              }
            />
          ))}

          <EditCardDialog
            card={{
              brand: 'Novo cartão',
              title: 'Novo cartão',
              name: '',
              limit: 0,
              currentUsage: 0,
              dueDate: '',
            }}
            onSave={(newCard) => {
              setCards((current) => [...current, newCard])
            }}
            createMode
          />
        </div>
      )}

      {view === 'income' && (
        <div className="flex flex-col gap-4">
          {incomeData.map((income, index) => (
            <div
              className="flex flex-col gap-3"
              key={`${income.label}-${index}`}
            >
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex-1 rounded-lg text-left"
                  onClick={() => openIncomeEditor(index, income)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-slate-400">{income.label}:</p>
                    <p className="font-semibold text-lg text-slate-100">
                      R$ {income.amount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Status:</p>
                    <p className="text-sm text-slate-400">{income.status}</p>
                  </div>
                </button>
                <div className="w-fit">
                  <Button
                    type="button"
                    className="bg-transparent border border-slate-600"
                    onClick={() => openIncomeEditor(index, income)}
                  >
                    <LucideCheck />
                  </Button>
                </div>
              </div>
              <Separator className="bg-slate-600" />
            </div>
          ))}

          <Dialog
            open={editingIncomeIndex !== null}
            onOpenChange={(open) => {
              if (!open) {
                closeIncomeEditor()
              }
            }}
          >
            <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
              <DialogHeader>
                <DialogTitle>Editar receita</DialogTitle>
                <DialogDescription>
                  Ajuste os dados da receita e salve ou remova o item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="income-edit-label">Descrição</Label>
                  <Input
                    id="income-edit-label"
                    className="border-slate-600"
                    value={incomeDraft.label}
                    onChange={(event) =>
                      setIncomeDraft((current) => ({
                        ...current,
                        label: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="income-edit-amount">Valor</Label>
                  <Input
                    id="income-edit-amount"
                    className="border-slate-600"
                    value={incomeDraft.amount}
                    onChange={(event) =>
                      setIncomeDraft((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="income-edit-status">Status</Label>
                  <Input
                    id="income-edit-status"
                    className="border-slate-600"
                    value={incomeDraft.status}
                    onChange={(event) =>
                      setIncomeDraft((current) => ({
                        ...current,
                        status: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={deleteIncome}
                >
                  <Trash2 className="size-4" />
                  Excluir
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeIncomeEditor}
                  >
                    Cancelar
                  </Button>
                  <Button type="button" onClick={saveIncome}>
                    Salvar
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AddIncomeDialog
            onAddIncome={(income) =>
              setIncomeData((current) => [...current, income])
            }
          />
        </div>
      )}

      {view === 'expenses' && (
        <div className="flex flex-col gap-4">
          {expenseData.map((expense, index) => (
            <div
              className="flex flex-col gap-3"
              key={`${expense.label}-${index}`}
            >
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex-1 rounded-lg text-left"
                  onClick={() => openExpenseEditor(index, expense)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-slate-400">{expense.label}</p>
                    <p className="font-semibold text-lg text-slate-100">
                      {expense.amount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Status:</p>
                    <p className="text-sm text-slate-400">{expense.status}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Vencimento:</p>
                    <p className="text-sm text-slate-400">{expense.due}</p>
                  </div>
                </button>
                <div className="w-fit">
                  <Button
                    type="button"
                    className="bg-transparent border border-slate-600"
                    onClick={() => openExpenseEditor(index, expense)}
                  >
                    <LucideCheck />
                  </Button>
                </div>
              </div>
              <Separator className="bg-slate-600" />
            </div>
          ))}

          <Dialog
            open={editingExpenseIndex !== null}
            onOpenChange={(open) => {
              if (!open) {
                closeExpenseEditor()
              }
            }}
          >
            <DialogContent className="max-w-md bg-slate-900 text-background border border-slate-600">
              <DialogHeader>
                <DialogTitle>Editar despesa</DialogTitle>
                <DialogDescription>
                  Ajuste os dados da despesa e salve ou remova o item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expense-edit-label">Descrição</Label>
                  <Input
                    id="expense-edit-label"
                    className="border-slate-600"
                    value={expenseDraft.label}
                    onChange={(event) =>
                      setExpenseDraft((current) => ({
                        ...current,
                        label: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expense-edit-amount">Valor</Label>
                  <Input
                    id="expense-edit-amount"
                    className="border-slate-600"
                    value={expenseDraft.amount}
                    onChange={(event) =>
                      setExpenseDraft((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expense-edit-status">Status</Label>
                  <Input
                    id="expense-edit-status"
                    className="border-slate-600"
                    value={expenseDraft.status}
                    onChange={(event) =>
                      setExpenseDraft((current) => ({
                        ...current,
                        status: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expense-edit-due">Vencimento</Label>
                  <Input
                    id="expense-edit-due"
                    type="date"
                    className="border-slate-600"
                    value={expenseDraft.due}
                    onChange={(event) =>
                      setExpenseDraft((current) => ({
                        ...current,
                        due: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={deleteExpense}
                >
                  <Trash2 className="size-4" />
                  Excluir
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeExpenseEditor}
                  >
                    Cancelar
                  </Button>
                  <Button type="button" onClick={saveExpense}>
                    Salvar
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AddExpensesDialog
            onAddExpense={(expense) =>
              setExpenseData((current) => [...current, expense])
            }
          />
        </div>
      )}

      {view === 'economies' && (
        <div className="flex flex-col gap-4">
          <FreezePersonalFinanceInvestments />
        </div>
      )}
    </div>
  )
}
