<script setup lang="ts">
import type { TCoreFormField, TCoreFormProps } from '@core/form/type'
import type { VForm } from 'vuetify/components'
import { triggerRules } from '~/src/@core/form/helpers'
import { EnumActionType, EnumFieldType } from '@core/form/type'
import FieldRender from '@core/form/render/index.vue'
import { formatLabel } from './utils'

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

function handleFieldChange({
  field,
  prevValue,
  newValue,
}: {
  field: TCoreFormField
  prevValue: any
  newValue: any
}) {
  userInteracted.value = true
  console.log(`Field changed: ${field.label}` + `(value: ${prevValue} -> ${newValue})`)
  if (field.value && formErrors.value[field.value]) {
    console.log(`Clearing error for field: ${field.label}`)
    formErrors.value[field.value] = false
    updateErrorTabs()
  }
}

function updateErrorTabs() {
  errorTabs.value = []
  if (!props.schema?.tabs)
    return

  for (let i = 0; i < props.schema.tabs.length; i++) {
    const tab = props.schema.tabs[i]
    const hasTabError = tab.fields.some((field) => {
      return field.value && formErrors.value[field.value] === true
    })

    if (hasTabError && !errorTabs.value.includes(i))
      errorTabs.value.push(i)
  }
}

async function handleSubmit() {
  setSubmitting(true)
  try {
    console.log('Form submission successful', formData.value)
    console.log('Form data by field:', JSON.stringify(formData.value, null, 2))
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
        if (field.value) {
          formData.value[field.value] = ''
        }
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
        if (field.value && field.required && (!formData.value[field.value] || formData.value[field.value].trim() === '')) {
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
        if (field.value) {
          formData.value[field.value] = ''
        }
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
                  <template
                    v-for="(field, fieldIndex) in tab.fields"
                    :key="fieldIndex"
                  >
                    <div
                      v-if="field.type === EnumFieldType.DIVIDER || field.type === EnumFieldType.DIVIDER_DASHED"
                      class="divider"
                      :class="{
                        'divider-dashed': field.type === EnumFieldType.DIVIDER_DASHED,
                      }"
                    />
                    <VCol
                      v-else
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
                          let prevValue = formData[field.value];
                          formData[field.value] = newValue;
                          handleFieldChange({
                            field,
                            prevValue,
                            newValue,
                          })
                        }"
                      />
                    </VCol>
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
