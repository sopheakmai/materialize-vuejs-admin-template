<script setup lang="ts">
import type { TCoreFormProps } from '@core/form/type'
import type { VForm } from 'vuetify/components'
import { triggerRules } from '~/src/@core/form/helpers'
import FieldRender from '@core/form/render/index.vue'
import { formatLabel } from './utils'
import { EnumFieldType } from './enum/field'
import { EnumActionType } from './enum/action'
import { useForm } from '@core/form/useForm'

const props = withDefaults(defineProps<TCoreFormProps>(), {})
const emit = defineEmits<{
  'onResponse': []
  'onResponseError': [error: any]
}>()
const { t } = useI18n()
const { loading: fetching, setLoading: setFetching } = useLoading()
const { loading: submitting, setLoading: setSubmitting } = useLoading()
const { loading, setLoading } = useLoading()
const refForm = ref<VForm | null>(null)

// Deep clone the schema for safe manipulation
const schema = computed(() => {
  if (!props.schema)
    return null
  return structuredClone(props.schema)
})

// Use the form composable
const {
  formData,
  formErrors,
  errorTabs,
  currentTab,
  userInteracted,
  density,
  validateField,
  validateAllFields,
  handleFieldChange,
  handleSubmit: formHandleSubmit,
  resetForm,
  resetFormErrors,
  getValidationSummary,
  isFormValid,
  hasErrors,
} = useForm({
  schema,
  formRef: refForm,
  onSubmit: async (data) => {
    setSubmitting(true)
    try {
      console.log('Form submission successful', data)
      console.log('Form data by field:', JSON.stringify(data, null, 2))
      emit('onResponse')
    }
    catch (error) {
      console.error('Form submission error:', error)
      emit('onResponseError', error)
      throw error
    }
    finally {
      setSubmitting(false)
    }
  },
  onError: (errors) => {
    console.warn('Form validation failed:', errors)
    emit('onResponseError', errors)
  },
  onFieldChange: (field, prevValue, newValue) => {
    console.log(`Field changed: ${field.label} (${prevValue} -> ${newValue})`)
  },
  validateOnChange: true,
})

async function fetchData() {
  setFetching(true)
  try {
    console.log('Fetching initial data...')
  }
  finally {
    setFetching(false)
  }
}

// Handle form submission
const handleSubmit = async () => {
  await formHandleSubmit()
}

// Expose validation functions for external use
defineExpose({
  validateAllFields,
  validateField,
  getValidationSummary,
  resetForm,
  resetFormErrors,
  formData: readonly(formData),
  formErrors: readonly(formErrors),
  schema: readonly(schema),
  isFormValid,
  hasErrors,
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <VSkeletonLoader
    v-if="fetching"
    type="card"
  />
  <VCard
    v-else
    variant="elevated"
    :loading="loading"
  >
    <template #prepend>
      <VBtn
        icon="solar-alt-arrow-left-outline"
        variant="text"
        :disabled="loading || submitting"
      />
    </template>
    <template #title>
      <h4 class="d-block">
        {{ $t("create") }}
        <span v-if="actionType !== EnumActionType.CREATE">:</span>
      </h4>
    </template>
    <template #append>
      <div class="d-flex gap-4 align-center">
        <VBtn
          type="reset"
          color="secondary"
          variant="outlined"
          :loading="loading"
          :disabled="submitting"
          @click="resetForm"
        >
          {{ t("reset") }}
        </VBtn>
        <VBtn
          type="submit"
          :loading="submitting"
          :disabled="loading"
          @click="handleSubmit"
        >
          {{ t("submit") }}
        </VBtn>
      </div>
    </template>
    <template #default>
      <VForm ref="refForm">
        <VTabs v-model="currentTab">
          <VTab
            v-for="(tab, index) in schema?.tabs"
            :key="tab.title"
            :value="index"
            :prepend-icon="tab?.prependIcon"
            :append-icon="tab?.appendIcon"
            :class="{ 'error-tab': userInteracted && errorTabs.includes(index) }"
          >
            {{ t(tab.title) }}
          </VTab>
        </VTabs>
        <VCard flat>
          <VCardText>
            <VWindow
              v-model="currentTab"
              class="disable-tab-transition"
            >
              <VWindowItem
                v-for="(tab, index) in schema?.tabs"
                :key="tab.title"
                :value="index"
              >
                <VRow>
                  <template
                    v-for="(field, fieldIndex) in tab.fields"
                    :key="fieldIndex"
                  >
                    <!-- Divider -->
                    <template v-if="field.type === EnumFieldType.DIVIDER || field.type === EnumFieldType.DIVIDER_DASHED">
                      <div
                        class="divider"
                        :class="{
                          'divider-dashed': field.type === EnumFieldType.DIVIDER_DASHED,
                        }"
                      />
                    </template>
                    <!-- Section Header -->
                    <template v-else-if="field.type === EnumFieldType.SECTION_HEADER">
                      <VCol cols="12">
                        <h3 class="text-h6 mb-2">
                          {{ t(field.label || '') }}
                        </h3>
                        <p v-if="field.description" class="text-body-2 text--secondary mb-4">
                          {{ t(field.description) }}
                        </p>
                      </VCol>
                    </template>
                    <!-- Regular Field -->
                    <template v-else>
                      <VCol
                        cols="12"
                        sm="6"
                      >
                        <FieldRender
                          :id="`field-${field.value}`"
                          :name="`field-${field.value}`"
                          :field="field"
                          :value="formData[field.value]"
                          :label="formatLabel({ label: t(field.label), isRequired: field.required })"
                          :placeholder="isEmpty(field?.placeholder) ? t('enter') : field.placeholder"
                          :rules="triggerRules(field)"
                          :density="density"
                          :error="userInteracted && formErrors[field.value] === true"
                          @update:model-value="(newValue: any) => {
                            const prevValue = formData[field.value];
                            handleFieldChange(field, prevValue, newValue);
                          }"
                        />
                      </VCol>
                    </template>
                  </template>
                </VRow>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VForm>
    </template>
  </VCard>
</template>

<style scoped lang="scss">
.error-tab {
  color: rgb(var(--v-theme-error)) !important;
}

.divider {
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
  width: 100%;
  margin: 16px 0;
  padding: 0;
  box-sizing: border-box;

  &-dashed {
    border-top: 1px dashed rgba(0, 0, 0, 0.12);
    width: 100%;
    margin: 16px 0;
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
