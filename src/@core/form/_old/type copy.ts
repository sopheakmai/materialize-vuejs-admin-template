export enum EnumActionType {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view',
  DUPLICATE = 'duplicate',
}

export enum EnumFieldType {
  TEXT = 'text', // ✅
  NUMBER = 'number', // ✅
  EMAIL = 'email', // ✅
  PASSWORD = 'password', // ✅
  SELECT = 'select', // ✅
  RADIO = 'radio',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea', // ✅
  SWITCH = 'switch',
  DIVIDER = 'divider', // ✅
  DIVIDER_DASHED = 'divider-dashed', // ✅
  SECTION_HEADER = 'section-header', // ✅
}

// Option type for select/radio/checkbox fields
export type TFieldOption = {
  label: string
  value: string
  disabled?: boolean
}

// Base properties shared by all field types
type TBaseFormField = {
  id?: string
  name?: string
  disabled?: boolean
  className?: string
  validate?: boolean
  'data-testid'?: string
}

// Core form field with discriminated union for different field types
export type TCoreFormField = TBaseFormField & (
  // Text input fields
  | {
    type: EnumFieldType.TEXT | EnumFieldType.EMAIL | EnumFieldType.PASSWORD | EnumFieldType.NUMBER
    value?: string
    label: string
    required?: boolean
    placeholder?: string
  }

  // Textarea field
  | {
    type: EnumFieldType.TEXTAREA
    value?: string
    label: string
    required?: boolean
    placeholder?: string
    rows?: number
  }

  // Select dropdown field
  | {
    type: EnumFieldType.SELECT
    value?: string
    label: string
    required?: boolean
    placeholder?: string
    options: TFieldOption[]
    multiple?: boolean
  }

  // Radio button group
  | {
    type: EnumFieldType.RADIO
    value?: string
    label: string
    required?: boolean
    options: TFieldOption[]
  }

  // Checkbox field (single checkbox)
  | {
    type: EnumFieldType.CHECKBOX
    value?: boolean
    label: string
    required?: boolean
  }

  // Checkbox group (multiple checkboxes)
  // | {
  //   type: EnumFieldType.CHECKBOX_GROUP
  //   value?: string[]
  //   label: string
  //   required?: boolean
  //   options: TFieldOption[]
  // }

  // Date input field
  | {
    type: EnumFieldType.DATE
    value?: string
    label: string
    required?: boolean
    min?: string
    max?: string
  }

  // File upload field
  // | {
  //   type: EnumFieldType.FILE
  //   value?: FileList | File[]
  //   label: string
  //   required?: boolean
  //   accept?: string
  //   multiple?: boolean
  //   rules?: TValidationRule[]
  //   validate?: TValidationRule
  // }
  // Visual dividers (no form data)
  | {
    type: EnumFieldType.DIVIDER
  }
  | {
    type: EnumFieldType.DIVIDER_DASHED
  }
  // Section header (no form data)
  | {
    type: EnumFieldType.SECTION_HEADER
    label: string
    description?: string
  }
)

// Helper type to extract field value type based on field type
export type TFieldValue<T extends TCoreFormField>
  = T extends { value?: infer V } ? V : never

// Helper type for form data extraction
export type TFormData<T extends Record<string, TCoreFormField>> = {
  [K in keyof T]: TFieldValue<T[K]>
}

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
