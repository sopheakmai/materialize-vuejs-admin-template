// 👉 Client
export type Client = {
  address: string
  company: string
  companyEmail: string
  country: string
  contact: string
  name: string
}

// 👉 Invoice
export type Invoice = {
  id: number
  issuedDate: string
  client: Client
  service: string
  total: number
  avatar: string
  invoiceStatus: string
  balance: number
  dueDate: string
}

// Payment details
export type PaymentDetails = {
  totalDue: string
  bankName: string
  country: string
  iban: string
  swiftCode: string
}
