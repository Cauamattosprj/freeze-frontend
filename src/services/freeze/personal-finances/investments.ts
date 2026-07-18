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

export type Deposit = {
  id?: string
  amount: number
  date: Date
}

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

const BASE_URL = '/api/investments'

async function baseFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.headers.get('content-type')?.includes('application/json')
    ? (await res.json() as T)
    : (null as unknown as T)
}

export function getInvestments(): Promise<Investment[]> {
  return baseFetch<Investment[]>(BASE_URL)
}

export function getInvestment(id: string): Promise<Investment> {
  return baseFetch<Investment>(`${BASE_URL}/${id}`)
}

export function createInvestment(data: Investment): Promise<Investment> {
  return baseFetch<Investment>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateInvestment(id: string, data: Partial<Investment>): Promise<Investment> {
  return baseFetch<Investment>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteInvestment(id: string): Promise<void> {
  return baseFetch<void>(`${BASE_URL}/${id}`, { method: 'DELETE' })
}