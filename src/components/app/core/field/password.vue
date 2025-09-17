<script lang="ts" setup>
const show1 = ref(false)
const password = ref('Password')

const rules = {
  required: (value: string) => !!value || 'Required.',
  min: (v: string) => v.length >= 8 || 'Min 8 characters',
}
</script>

<template>
  <VTextField
    v-model="password"
    :append-inner-icon="show1 ? 'ri-eye-off-line' : 'ri-eye-line'"
    :rules="[rules.required, rules.min]"
    :type="show1 ? 'text' : 'password'"
    name="input-10-1"
    label="Normal with hint text"
    hint="At least 8 characters"
    placeholder="············"
    counter
    @click:append-inner="show1 = !show1"
  />
</template>
