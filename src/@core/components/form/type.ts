import type { EnumActionType } from './enum/action'
import type { EnumFieldType } from './enum/field'
import type { Ref } from 'vue'
import type { VForm } from 'vuetify/components'

export type TCoreFormField = {
  type: EnumFieldType
  value?: string
  label?: string
  description?: string
  required?: boolean
  placeholder?: string
  options?: Array<{
    label: string
    value: string
  }>
  rules?: Array<(value: any) => boolean | string>
  validate?: (value: any) => boolean | string
  layout?: {
    cols?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
} & (
  {
    value: string
    label: string
  }
  | {
    type: EnumFieldType.SELECT | EnumFieldType.RADIO | EnumFieldType.CHECKBOX
    options: Array<{
      label: string
      value: string
    }>
    value: string
    label: string
  } | {
    type: EnumFieldType.DIVIDER
  } | {
    type: EnumFieldType.DIVIDER_DASHED
  }
)

export type TCoreFormSchema = {
  context: {
    recordId: string | null
    url: string
  }
  tabs?: Array<{
    title: string
    appendIcon?: string
    prependIcon?: string
    fields: Array<TCoreFormField>
  }>
}

export type TCoreFormProps = {
  actionType: EnumActionType
  module: {
    endpoint: string
    path: string
  }
  schema?: TCoreFormSchema
  preGet?: () => void
  postGet?: (data: any) => void
  preCreate?: (data: any) => void
  postCreate?: (data: any) => void
  preUpdate?: (data: any) => void
  postUpdate?: (data: any) => void
}

export type UseFormOptions = {
  schema: Ref<TCoreFormSchema | null>
  formRef: Ref<VForm | null>
  onSubmit?: (data: Record<string, any>) => Promise<void> | void
  onError?: (errors: Record<string, boolean>) => void
  onFieldChange?: (field: TCoreFormField, prevValue: any, newValue: any) => void
  validateOnChange?: boolean
}

export type ValidationSummary = {
  totalFields: number
  validFields: number
  errorFields: number
  errorTabs: number[]
  isValid: boolean
}

export type UseFormReturn = {
  // State
  formData: Ref<Record<string, any>>
  formErrors: Ref<Record<string, boolean>>
  errorTabs: Ref<number[]>
  currentTab: Ref<number>
  userInteracted: Ref<boolean>
  density: Ref<'comfortable' | 'compact' | 'default'>

  // Actions
  validateField: (field: TCoreFormField, value: any) => Promise<boolean>
  validateAllFields: () => Promise<boolean>
  handleFieldChange: (field: TCoreFormField, prevValue: any, newValue: any) => Promise<void>
  handleSubmit: () => Promise<void>
  resetForm: () => void
  resetFormErrors: () => void

  // Utilities
  getValidationSummary: () => ValidationSummary
  updateErrorTabs: () => void
  initializeFormData: () => void

  // Computed
  isFormValid: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  totalFieldsCount: ComputedRef<number>
}
