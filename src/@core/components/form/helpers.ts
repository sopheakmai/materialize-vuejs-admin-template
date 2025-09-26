import { EnumFieldType } from './enum/field'
import type { TCoreFormField } from './type'
import { emailValidator, passwordValidator, requiredValidator } from './validators'

export function triggerRules(field: TCoreFormField) {
  const rules = []
  if (field.required) {
    rules.push(requiredValidator)
  }

  if (field.validate) {
    switch (field.type) {
      case EnumFieldType.EMAIL:
        rules.push(emailValidator)
        break
      case EnumFieldType.PASSWORD:
        rules.push(passwordValidator)
        break
      default:
        break
    }
  }

  return rules
}
