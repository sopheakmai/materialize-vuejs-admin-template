<script setup lang="ts">
import { basic, validation, vertical } from '@/views/demos/forms/form-wizard/form-wizard-numbered/demoCodeFormWizardNumbered'

import DemoFormWizardNumberedBasic from '@/views/demos/forms/form-wizard/form-wizard-numbered/DemoFormWizardNumberedBasic.vue'
import DemoFormWizardNumberedValidation from '@/views/demos/forms/form-wizard/form-wizard-numbered/DemoFormWizardNumberedValidation.vue'
import DemoFormWizardNumberedVertical from '@/views/demos/forms/form-wizard/form-wizard-numbered/DemoFormWizardNumberedVertical.vue'
</script>

<template>
  <VRow>
    <!-- 👉 Basic -->
    <VCol cols="12">
      <AppCardCode
        variant="outlined"
        title="Basic"
        :code="basic"
      >
        <DemoFormWizardNumberedBasic />
      </AppCardCode>
    </VCol>

    <!-- 👉 Validation -->
    <VCol cols="12">
      <AppCardCode
        variant="outlined"
        title="Validation"
        :code="validation"
      >
        <DemoFormWizardNumberedValidation />
      </AppCardCode>
    </VCol>

    <!-- 👉 Vertical -->
    <VCol cols="12">
      <AppCardCode
        variant="outlined"
        title="Vertical"
        :code="vertical"
      >
        <DemoFormWizardNumberedVertical />
      </AppCardCode>
    </VCol>
  </VRow>
</template>
