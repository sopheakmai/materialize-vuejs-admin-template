export enum EnumActionType {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view',
  DUPLICATE = 'duplicate',
}

export enum EnumFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
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
    fields: Array<{
      value: string
      label: string
      required?: boolean
      placeholder?: string
      type: EnumFieldType
      rules?: Array<(value: any) => boolean | string>
    }>
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
