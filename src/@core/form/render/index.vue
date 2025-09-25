<script setup lang="ts">
import { EnumFieldType } from '../type'
import type { TCoreFormField } from '../type'
import { formatOptionLabel } from '../utils'

defineProps<{
  field: TCoreFormField
}>()

const { t } = useI18n()
const showPassword = ref(false)
</script>

<template>
  <VTextField
    v-if="field.type === EnumFieldType.TEXT"
    v-bind="$attrs"
    variant="solo"
    flat
  />
  <VTextField
    v-else-if="field.type === EnumFieldType.PASSWORD"
    v-bind="$attrs"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
    variant="solo"
    flat
    @click:append-inner="showPassword = !showPassword"
  />
  <VTextarea
    v-else-if="field.type === EnumFieldType.TEXTAREA"
    v-bind="$attrs"
    variant="solo"
    flat
    auto-grow
    :rows="3"
    :max-rows="6"
  />
  <VTextField
    v-else-if="field.type === EnumFieldType.NUMBER"
    v-bind="$attrs"
    type="number"
    variant="solo"
    flat
  />
  <VTextField
    v-else-if="field.type === EnumFieldType.EMAIL"
    v-bind="$attrs"
    variant="solo"
    flat
  />
  <VSelect
    v-else-if="field.type === EnumFieldType.SELECT"
    v-bind="$attrs"
    variant="solo"
    flat
    item-title="label"
    item-value="value"
    :items="field.options || []"
  >
    <template #item="{ props, item }">
      <VListItem v-bind="props" :title="t(formatOptionLabel(item.raw.label))" />
    </template>

    <template #selection="{ item }">
      {{ t(formatOptionLabel(item.raw.label)) }}
    </template>
  </VSelect>
</template>

<style scoped lang="scss">
:deep(.v-field) {
  border: 1px solid #e7e7e7;
  border-radius: 8px;

  .v-label {
    color: #6d6d6d;
    font-style: regular;
    font-weight: 400;
    letter-spacing: 0%;
    vertical-align: bottom;
  }
}
</style>
