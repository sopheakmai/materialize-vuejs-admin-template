<script setup lang="ts">
import type { VForm } from 'vuetify/components'
import type { TCoreFormProps } from './type'
import AppCoreFieldText from '@/components/app/core/field/text.vue'
import { formatLabel } from './utils'
import { requiredValidator } from '@/@core/utils/validators'

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

const density = ref<'comfortable' | 'compact' | 'default'>('comfortable')
const currentTab = ref(0)
const formData = ref<Record<string, any>>({})
const formErrors = ref<Record<string, boolean>>({})
const errorTabs = ref<number[]>([])
const userInteracted = ref(false)

async function fetchData() {
  setFetching(true)
  try {
    console.log('Fetching initial data...')
  }
  finally {
    setFetching(false)
  }
}

watch(currentTab, (newVal) => {
  console.log('Tab changed to:', newVal)
  if (errorTabs.value.length > 0) {
    console.log('Tabs with errors:', errorTabs.value)
  }
})

function handleInputChange(fieldName: string) {
  userInteracted.value = true
  console.log(`Field changed: ${fieldName}`)
  if (formErrors.value[fieldName]) {
    console.log(`Clearing error for field: ${fieldName}`)
    formErrors.value[fieldName] = false
    updateErrorTabs()
  }
}

function updateErrorTabs() {
  errorTabs.value = []
  if (!props.schema?.tabs)
    return

  for (let i = 0; i < props.schema.tabs.length; i++) {
    const tab = props.schema.tabs[i]
    const hasTabError = tab.fields.some(field => formErrors.value[field.value])

    if (hasTabError && !errorTabs.value.includes(i))
      errorTabs.value.push(i)
  }
}

async function handleSubmit() {
  setSubmitting(true)
  try {
    console.log('Form submission successful', formData.value)
    // For debugging and tracking form data
    console.log('Form data by field:')
    Object.entries(formData.value).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })
  }
  catch (error) {
    console.error('Form submission error:', error)
  }
  finally {
    setSubmitting(false)
  }
}

async function validateAndSubmit() {
  resetFormErrors()
  const isValid = await validateAllTabsAndHighlightErrors(true)

  if (isValid) {
    console.log('Form validation successful, submitting...')
    handleSubmit()
  }
  else {
    console.warn('Form validation failed - found errors')
  }
}

function resetFormErrors() {
  formErrors.value = {}
  errorTabs.value = []
  refForm.value?.resetValidation()
}

function resetForm() {
  console.log('Resetting form data and validation state')
  refForm.value?.reset()
  resetFormErrors()
  userInteracted.value = false

  if (props.schema?.tabs) {
    props.schema.tabs.forEach((tab) => {
      tab.fields.forEach((field) => {
        formData.value[field.value] = ''
      })
    })
  }
}

async function validateAllTabsAndHighlightErrors(isSubmitting = false) {
  if (isSubmitting) {
    formErrors.value = {}
    errorTabs.value = []
    userInteracted.value = true
    await refForm.value?.validate()
    await nextTick()
  }

  if (!userInteracted.value && !isSubmitting)
    return true

  let isValid = true

  if (props.schema?.tabs) {
    for (let i = 0; i < props.schema.tabs.length; i++) {
      const tab = props.schema.tabs[i]
      let hasTabError = false

      for (const field of tab.fields) {
        if (field.required && (!formData.value[field.value] || formData.value[field.value].trim() === '')) {
          formErrors.value[field.value] = true
          isValid = false
          hasTabError = true
        }
      }

      if (hasTabError)
        errorTabs.value.push(i)
    }
  }

  if (isSubmitting && errorTabs.value.length > 0 && !errorTabs.value.includes(currentTab.value)) {
    console.log(`Switching to tab ${errorTabs.value[0]} with validation errors`)
    currentTab.value = errorTabs.value[0]
    await nextTick()
    await refForm.value?.validate()
  }

  return isValid
}

onMounted(() => {
  if (props.schema?.tabs) {
    props.schema.tabs.forEach((tab) => {
      tab.fields.forEach((field) => {
        formData.value[field.value] = ''
      })
    })
  }

  resetForm()
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
        {{ $t("create") }} :
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
          @click="validateAndSubmit"
        >
          {{ t("submit") }}
        </VBtn>
      </div>
    </template>
    <template #default>
      <VForm
        ref="refForm"
        @submit.prevent="handleSubmit"
      >
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
                  <VCol
                    v-for="field in tab.fields"
                    :key="field.value"
                    cols="12"
                    sm="6"
                  >
                    <AppCoreFieldText
                      :id="`field-${field.value}`"
                      :value="formData[field.value]"
                      :name="field.value"
                      :label="formatLabel({ label: t(field.label), isRequired: field.required })"
                      :placeholder="isEmpty(field.placeholder) ? t('enter') : field.placeholder"
                      :rules="field.required ? [requiredValidator] : []"
                      :density="density"
                      :error="userInteracted && formErrors[field.value] === true"
                      @input="handleInputChange(field.value)"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VForm>
    </template>
  </VCard>
</template>

<style scoped>
.error-tab {
  color: rgb(var(--v-theme-error)) !important;
}
</style>
