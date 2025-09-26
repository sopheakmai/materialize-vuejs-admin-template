// import { EnumFieldType } from './type'
// import type { TCoreFormField, TFieldOption } from './type'

export const formatLabel = ({ label, isRequired = false }: { label: string, isRequired?: boolean }) => {
  return label + (isRequired ? ' *' : '')
}

// e.g. "option ONE" , "Option one" -> "option.one"
export const formatOptionLabel = (label: string) => label.trim().toLowerCase().replace(/\s+/g, '.')

// // Type guards for field types
// export const isFormInputField = (field: TCoreFormField): field is TCoreFormField & { required?: boolean } => {
//   return ![
//     EnumFieldType.DIVIDER,
//     EnumFieldType.DIVIDER_DASHED,
//     EnumFieldType.RADIO,
//   ].includes(field.type)
// }

// export const hasOptions = (field: TCoreFormField): field is TCoreFormField & { options: TFieldOption[] } => {
//   return 'options' in field && Array.isArray(field.options)
// }

// export const hasValue = (field: TCoreFormField): field is TCoreFormField & { value?: any } => {
//   return 'value' in field
// }
