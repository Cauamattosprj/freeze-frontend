export type IncomeStatusEnum =
    | "RECEIVED"
    | "PENDING"
    | "OVERDUE"

export type ExpenseStatusEnum =
    | "PAID"
    | "PENDING"
    | "OVERDUE"

export const INCOME_STATUS_LABELS: Record<IncomeStatusEnum, string> = {
    RECEIVED: "Recebida",
    PENDING: "Pendente",
    OVERDUE: "Vencida",
}

export const EXPENSE_STATUS_LABELS: Record<ExpenseStatusEnum, string> = {
    PAID: "Pago",
    PENDING: "Pendente",
    OVERDUE: "Vencido",
}
