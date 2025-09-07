export type SalesDetails = {
  product: Product
  buyer: Buyer
  date: string
  payment: Payment
}

export type Product = {
  id: number
  name: string
  slug: string
  brand: string
  category: string
  price: number
  image: string
  hasFreeShipping: boolean
  rating: number
  description: string
}

export type Buyer = {
  name: string
  avatar: string | null
}

export type Payment = {
  total: number
  receivedPaymentStatus: string
  paidAmount: number
  status: string
}

export type Data = {
  responsiveId: string
  id: number
  avatar: string
  fullName: string
  post: string
  email: string
  city: string
  startDate: string
  salary: number
  age: string | number
  experience: string
  status: number
}
