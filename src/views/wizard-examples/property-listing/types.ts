export type PersonalDetails = {
  userType: 'builder' | 'owner' | 'broker'
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  contact: number | null
}

export type PriceDetails = {
  expectedPrice: number | null
  pricePerSqft: number | null
  maintenanceCharge: number | null
  maintenancePeriod: string | null
  bookingAmount: number | null
  otherAmount: number | null
  priceDisplayType: string
  priceIncludes: string[]
}

export type PropertyArea = {
  totalArea: number | null
  carpetArea: number | null
  plotArea: number | null
  availableFrom: string | null
  possessionStatus: string
  transactionType: string
  isOnMainRoad: string
  isGatedColony: string
}

export type PropertyDetails = {
  propertyDealType: 'sell' | 'rent'
  propertyType: string | null
  zipCode: number | null
  country: string | null
  state: string
  city: string
  landmark: string
  address: string
}

export type PropertyFeatures = {
  bedroomCount: string
  floorNo: string
  bathroomCount: string
  isCommonArea: boolean
  furnishedStatus: string | null
  furnishingDetails: string[]
  isCommonArea1: string
  isCommonArea2: string
}

export type PropertyListingData = {
  personalDetails: PersonalDetails
  propertyDetails: PropertyDetails
  propertyFeatures: PropertyFeatures
  propertyArea: PropertyArea
  priceDetails: PriceDetails
}
