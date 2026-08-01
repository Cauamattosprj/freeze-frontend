import { apiFetch } from '#/services/httpClient'
import type { Deposit } from "./deposit";

export type InvestmentCategory =
  | "STOCK"
  | "CDB"
  | "LCI"
  | "LCA"
  | "INVESTMENT_FUND"
  | "TREASURY_BOND"
  | "REAL_ESTATE_FUND"
  | "ETF"
  | "BDR"
  | "CORPORATE_BOND"
  | "CRI"
  | "CRA"
  | "CRYPTOCURRENCY"
  | "PENSION_FUND"
  | "SAVINGS_ACCOUNT";

export type InvestmentType = 
  | "FIXED_INCOME"
  | "VARIABLE_INCOME"

export type RentabilityPeriod = 
| "MONTHLY"
| "YEARLY"


export type Investment = {
  id?: string
  label: string
  initialAmount: number
  rentabilityRate: number
  rentabilityPeriod: RentabilityPeriod
  deposits: Deposit[]
  type: InvestmentType
  category: InvestmentCategory
}

const ENDPOINT = 'v1/investments'

export function getInvestments(): Promise<Investment[]> {
  return apiFetch<Investment[]>(ENDPOINT)
}

export function getInvestment(id: string): Promise<Investment> {
  return apiFetch<Investment>(`${ENDPOINT}/${id}`)
}

export function createInvestment(data: Investment): Promise<Investment> {
  return apiFetch<Investment>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateInvestment(id: string, data: Partial<Investment>): Promise<Investment> {
  return apiFetch<Investment>(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteInvestment(id: string): Promise<void> {
  return apiFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
