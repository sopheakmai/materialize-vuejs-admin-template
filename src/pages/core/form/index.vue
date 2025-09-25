<script setup lang="ts">
import CoreForm from '@core/form/index.vue'
import { EnumActionType, EnumFieldType } from '@core/form/type'
</script>

<template>
  <CoreForm
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
              type: EnumFieldType.DIVIDER_DASHED,
            },
            {
              label: 'email',
              value: 'email',
              type: EnumFieldType.EMAIL,
              required: false,
            },
            {
              label: 'password',
              value: 'password',
              type: EnumFieldType.PASSWORD,
              required: true,
            },
            {
              type: EnumFieldType.DIVIDER,
            },
            {
              label: 'age',
              value: 'age',
              type: EnumFieldType.NUMBER,
              required: true,
            },
            {
              label: 'gender',
              value: 'gender',
              type: EnumFieldType.SELECT,
              required: true,
              options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              type: EnumFieldType.DIVIDER,
            },
            {
              label: 'about',
              value: 'about',
              type: EnumFieldType.TEXTAREA,
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
