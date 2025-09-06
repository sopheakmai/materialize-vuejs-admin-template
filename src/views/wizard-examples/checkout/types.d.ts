export type CartItem = {
  id: number
  name: string
  seller: string
  inStock: boolean
  rating: number
  price: number
  discountPrice: number
  image: string
  quantity: number
  estimatedDelivery: string
}
export type Addresses = {
  title: string
  desc: string
  subtitle: string
  value: string
}

export type CheckoutData = {
  cartItems: CartItem[]
  promoCode: string
  orderAmount: number
  deliveryAddress: string
  deliverySpeed: string
  deliveryCharges: number
  addresses: Addresses[]
}
