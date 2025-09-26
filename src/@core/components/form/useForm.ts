import type { TCoreFormField, UseFormOptions, UseFormReturn, ValidationSummary } from '@core/form/type'
import { EnumFieldType } from '@core/form/enum/field'

export function useForm(options: UseFormOptions): UseFormReturn {
  const { schema, formRef, onSubmit, onError, onFieldChange, validateOnChange = true } = options

  // State
  const formData = ref<Record<string, any>>({})
  const formErrors = ref<Record<string, boolean>>({})
  const errorTabs = ref<number[]>([])
  const currentTab = ref(0)
  const userInteracted = ref(false)
  const density = ref<'comfortable' | 'compact' | 'default'>('comfortable')

  // Initialize form data based on schema
  const initializeFormData = (): void => {
    if (!schema.value?.tabs)
      return

    const initialData: Record<string, any> = {}
    schema.value.tabs.forEach((tab) => {
      tab.fields.forEach((field) => {
        if (field.value && field.type !== EnumFieldType.DIVIDER
          && field.type !== EnumFieldType.DIVIDER_DASHED
          && field.type !== EnumFieldType.SECTION_HEADER) {
          // Set default values based on field type
          switch (field.type) {
            case EnumFieldType.CHECKBOX:
              initialData[field.value] = false
              break
            case EnumFieldType.SWITCH:
              initialData[field.value] = false
              break
            case EnumFieldType.SELECT:
              initialData[field.value] = ''
              break
            case EnumFieldType.RADIO:
              initialData[field.value] = ''
              break
            default:
              initialData[field.value] = ''
          }
        }
      })
    })
    formData.value = initialData
  }

  // Validate individual field
  const validateField = async (field: TCoreFormField, value: any): Promise<boolean> => {
    if (!field.value)
      return true

    let isFieldValid = true

    // Skip validation for non-input fields
    if (field.type === EnumFieldType.DIVIDER
      || field.type === EnumFieldType.DIVIDER_DASHED
      || field.type === EnumFieldType.SECTION_HEADER) {
      return true
    }

    // Required field validation
    if (field.required) {
      const isEmpty = value === null || value === undefined || value === ''
        || (typeof value === 'string' && value.trim() === '')
        || (Array.isArray(value) && value.length === 0)

      if (isEmpty) {
        formErrors.value[field.value] = true
        isFieldValid = false
        console.log(`Validation failed for required field: ${field.label}`)
      }
    }

    // Custom rules validation
    if (field.rules && Array.isArray(field.rules) && value !== null && value !== undefined && value !== '') {
      for (const rule of field.rules) {
        try {
          const result = await rule(value)
          if (result !== true) {
            formErrors.value[field.value] = true
            isFieldValid = false
            console.log(`Rule validation failed for field: ${field.label}, error: ${result}`)
            break
          }
        }
        catch (error) {
          formErrors.value[field.value] = true
          isFieldValid = false
          console.error(`Rule validation error for field: ${field.label}`, error)
          break
        }
      }
    }

    // Field type specific validation
    if (value && value !== '') {
      switch (field.type) {
        case EnumFieldType.EMAIL: {
          const emailValue = String(value)
          if (!emailValue.includes('@') || !emailValue.includes('.') || emailValue.length < 5) {
            formErrors.value[field.value] = true
            isFieldValid = false
            console.log(`Email validation failed for field: ${field.label}`)
          }
          break
        }

        case EnumFieldType.NUMBER: {
          if (Number.isNaN(Number(value)) || Number.isNaN(Number.parseFloat(String(value)))) {
            formErrors.value[field.value] = true
            isFieldValid = false
            console.log(`Number validation failed for field: ${field.label}`)
          }
          break
        }

        case EnumFieldType.DATE: {
          if (Number.isNaN(Date.parse(String(value)))) {
            formErrors.value[field.value] = true
            isFieldValid = false
            console.log(`Date validation failed for field: ${field.label}`)
          }
          break
        }
      }
    }

    // Clear error if validation passed
    if (isFieldValid && formErrors.value[field.value]) {
      formErrors.value[field.value] = false
    }

    return isFieldValid
  }

  // Update error tabs based on current errors
  const updateErrorTabs = (): void => {
    errorTabs.value = []
    if (!schema.value?.tabs)
      return

    for (let i = 0; i < schema.value.tabs.length; i++) {
      const tab = schema.value.tabs[i]
      const hasTabError = tab.fields.some((field) => {
        return field.value && formErrors.value[field.value] === true
      })

      if (hasTabError && !errorTabs.value.includes(i)) {
        errorTabs.value.push(i)
      }
    }
  }

  // Validate all fields in all tabs
  const validateAllFields = async (): Promise<boolean> => {
    formErrors.value = {}
    errorTabs.value = []
    userInteracted.value = true

    if (formRef.value) {
      await formRef.value.validate()
      await nextTick()
    }

    let isValid = true
    const validationPromises: Promise<boolean>[] = []

    if (schema.value?.tabs) {
      for (let tabIndex = 0; tabIndex < schema.value.tabs.length; tabIndex++) {
        const tab = schema.value.tabs[tabIndex]
        let hasTabError = false

        for (const field of tab.fields) {
          if (!field.value)
            continue

          const fieldValue = formData.value[field.value]
          const validationPromise = validateField(field, fieldValue).then((fieldValid) => {
            if (!fieldValid) {
              hasTabError = true
              isValid = false
            }
            return fieldValid
          })

          validationPromises.push(validationPromise)
        }

        // Wait for all field validations in this tab to complete
        await Promise.all(validationPromises)

        if (hasTabError && !errorTabs.value.includes(tabIndex)) {
          errorTabs.value.push(tabIndex)
        }
      }
    }

    // Wait for all validations to complete
    await Promise.all(validationPromises)

    // Switch to first error tab if validation failed
    if (!isValid && errorTabs.value.length > 0 && !errorTabs.value.includes(currentTab.value)) {
      console.log(`Switching to tab ${errorTabs.value[0]} with validation errors`)
      currentTab.value = errorTabs.value[0]
      await nextTick()
      if (formRef.value) {
        await formRef.value.validate()
      }
    }

    // Call error callback if provided
    if (!isValid && onError) {
      onError(formErrors.value)
    }

    console.log(`Validation complete. Valid: ${isValid}, Error tabs: [${errorTabs.value.join(', ')}]`)
    return isValid
  }

  // Handle field change
  const handleFieldChange = async (field: TCoreFormField, prevValue: any, newValue: any): Promise<void> => {
    userInteracted.value = true
    console.log(`Field changed: ${field.label} (value: ${prevValue} -> ${newValue})`)

    // Update form data
    if (field.value) {
      formData.value[field.value] = newValue
    }

    // Validate field on change if enabled
    if (validateOnChange && field.value) {
      await validateField(field, newValue)
      updateErrorTabs()
    }

    // Call change callback if provided
    if (onFieldChange) {
      onFieldChange(field, prevValue, newValue)
    }
  }

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    console.log('Starting form submission...')

    // Validate all fields first
    const isValid = await validateAllFields()

    if (!isValid) {
      console.warn('Form validation failed - found errors')
      return
    }

    // Call submit callback if provided
    if (onSubmit) {
      try {
        await onSubmit(formData.value)
        console.log('Form submission successful', formData.value)
      }
      catch (error) {
        console.error('Form submission error:', error)
        throw error
      }
    }
  }

  // Reset form errors
  const resetFormErrors = (): void => {
    formErrors.value = {}
    errorTabs.value = []
    if (formRef.value) {
      formRef.value.resetValidation()
    }
  }

  // Reset entire form
  const resetForm = (): void => {
    console.log('Resetting form data and validation state')

    if (formRef.value) {
      formRef.value.reset()
    }

    resetFormErrors()
    userInteracted.value = false
    initializeFormData()
  }

  // Get validation summary
  const getValidationSummary = (): ValidationSummary => {
    const totalFields = schema.value?.tabs?.reduce((count, tab) => {
      return count + tab.fields.filter(field => field.value
        && field.type !== EnumFieldType.DIVIDER
        && field.type !== EnumFieldType.DIVIDER_DASHED
        && field.type !== EnumFieldType.SECTION_HEADER).length
    }, 0) || 0

    const errorFields = Object.keys(formErrors.value).filter(key => formErrors.value[key] === true).length
    const validFields = totalFields - errorFields

    return {
      totalFields,
      validFields,
      errorFields,
      errorTabs: errorTabs.value,
      isValid: errorFields === 0,
    }
  }

  // Computed properties
  const isFormValid = computed(() => {
    return Object.values(formErrors.value).every(error => !error)
  })

  const hasErrors = computed(() => {
    return Object.values(formErrors.value).includes(true)
  })

  const totalFieldsCount = computed(() => {
    return schema.value?.tabs?.reduce((count, tab) => {
      return count + tab.fields.filter(field => field.value
        && field.type !== EnumFieldType.DIVIDER
        && field.type !== EnumFieldType.DIVIDER_DASHED
        && field.type !== EnumFieldType.SECTION_HEADER).length
    }, 0) || 0
  })

  // Watch schema changes to reinitialize data
  watch(schema, (newSchema) => {
    if (newSchema) {
      initializeFormData()
    }
  }, { immediate: true })

  // Watch current tab changes
  watch(currentTab, (newVal) => {
    console.log('Tab changed to:', newVal)
    if (errorTabs.value.length > 0) {
      console.log('Tabs with errors:', errorTabs.value)
    }
  })

  return {
    // State
    formData,
    formErrors,
    errorTabs,
    currentTab,
    userInteracted,
    density,

    // Actions
    validateField,
    validateAllFields,
    handleFieldChange,
    handleSubmit,
    resetForm,
    resetFormErrors,

    // Utilities
    getValidationSummary,
    updateErrorTabs,
    initializeFormData,

    // Computed
    isFormValid,
    hasErrors,
    totalFieldsCount,
  }
}
