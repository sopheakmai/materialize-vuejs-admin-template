<script setup lang="ts">
// Redirect to user list when accessing /apps/user/view without an ID
import { useRouter } from 'vue-router'

const router = useRouter()

// Immediately redirect to user list
router.replace({ name: 'apps-user-list' })
</script>

<template>
  <!-- This component will redirect immediately, so no template content is needed -->
  <div></div>
</template>