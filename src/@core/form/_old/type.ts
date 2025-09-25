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
}

export type TCoreFormField = {
  type: EnumFieldType
  value?: string
  label?: string
  required?: boolean
  placeholder?: string
  options?: Array<{
    label: string
    value: string
  }>
  rules?: Array<(value: any) => boolean | string>
  validate?: (value: any) => boolean | string
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
