import type { Invoice, PaymentDetails } from '@/plugins/fake-api/handlers/apps/invoice/types'

export type PurchasedProduct = {
  title: string
  cost: number
  hours: number
  description: string
}

export type InvoiceData = {
  invoice: Invoice
  paymentDetails: PaymentDetails
  purchasedProducts: PurchasedProduct[]
  note: string
  paymentMethod: string
  salesperson: string
  thanksNote: string
}

export type InvoiceParams = {
  q?: string
  status?: string
  startDate?: string
  endDate?: string
  options?: object
}
