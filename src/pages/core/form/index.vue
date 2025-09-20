<script setup lang="ts">
import AppCoreForm from '@/components/app/core/form/index.vue'
import { EnumActionType, EnumFieldType } from '~/src/components/app/core/form/type'
</script>

<template>
  <AppCoreForm
    :action-type="EnumActionType.CREATE"
    :module="{ endpoint: 'users', path: '/users' }"
    :schema="{
      context: {
        recordId: null,
        url: '/users',
      },
      tabs: [
        {
          title: 'user.information',
          appendIcon: '',
          prependIcon: 'mdi-account-circle',
          fields: [
            {
              label: 'name',
              value: 'name',
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              label: 'email',
              value: 'email',
              type: EnumFieldType.TEXT,
              required: true,
            },
          ],
        },
        {
          title: 'user.address',
          fields: [
            {
              label: 'address',
              value: 'address',
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              label: 'city',
              value: 'city',
              type: EnumFieldType.TEXT,
            },
          ],
        },
        {
          title: 'user.social',
          fields: [
            {
              label: 'twitter',
              value: 'twitter',
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              label: 'facebook',
              value: 'facebook',
              type: EnumFieldType.TEXT,
            },
          ],
        },
      ],
    }"
  />
</template>

<style scoped>
</style>
