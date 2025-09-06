<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  emailsMeta: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggleComposeDialogVisibility'])

defineOptions({
  inheritAttrs: false,
})

const inboxEmails = ref(0)
const draftEmails = ref(0)
const spamEmails = ref(0)
const starredEmails = ref(0)

watch(() => props.emailsMeta, emailsMeta => {
  if (!emailsMeta)
    return
  inboxEmails.value = emailsMeta.inbox
  draftEmails.value = emailsMeta.draft
  spamEmails.value = emailsMeta.spam
  starredEmails.value = emailsMeta.star
}, {
  immediate: true,
  deep: true,
})

const folders = computed(() => [
  {
    title: 'Inbox',
    prependIcon: 'ri-mail-line',
    to: { name: 'apps-email' },
    badge: {
      content: inboxEmails.value,
      color: 'primary',
    },
  },
  {
    title: 'Sent',
    prependIcon: 'ri-send-plane-line',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'sent' },
    },
  },
  {
    title: 'Draft',
    prependIcon: 'ri-edit-box-line',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'draft' },
    },
    badge: {
      content: draftEmails.value,
      color: 'warning',
    },
  },
  {
    title: 'Starred',
    prependIcon: 'ri-star-line',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'starred' },
    },
    badge: {
      content: starredEmails.value,
      color: 'success',
    },
  },
  {
    title: 'Spam',
    prependIcon: 'ri-spam-2-line',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'spam' },
    },
    badge: {
      content: spamEmails.value,
      color: 'error',
    },
  },
  {
    title: 'Trash',
    prependIcon: 'ri-delete-bin-7-line',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'trashed' },
    },
  },
])

const labels = [
  {
    title: 'Personal',
    color: 'success',
    to: {
      name: 'apps-email-label',
      params: { label: 'personal' },
    },
  },
  {
    title: 'Company',
    color: 'primary',
    to: {
      name: 'apps-email-label',
      params: { label: 'company' },
    },
  },
  {
    title: 'Important',
    color: 'warning',
    to: {
      name: 'apps-email-label',
      params: { label: 'important' },
    },
  },
  {
    title: 'Private',
    color: 'error',
    to: {
      name: 'apps-email-label',
      params: { label: 'private' },
    },
  },
]
</script>

<template>
  <div class="d-flex flex-column h-100">
    <!-- 👉 Compose -->
    <div class="pa-5">
      <VBtn
        block
        @click="$emit('toggleComposeDialogVisibility')"
      >
        Compose
      </VBtn>
    </div>

    <!-- 👉 Folders -->
    <PerfectScrollbar
      :options="{ wheelPropagation: false }"
      class="h-100 pt-4"
    >
      <ul class="email-filters-labels">
        <RouterLink
          v-for="folder in folders"
          :key="folder.title"
          v-slot="{ isActive, href, navigate }"
          class="d-flex align-center cursor-pointer"
          :to="folder.to"
          custom
        >
          <li
            v-bind="$attrs"
            :href="href"
            :class="isActive && 'email-filter-active text-primary'"
            class="d-flex align-center cursor-pointer"
            @click="navigate"
          >
            <VIcon
              :icon="folder.prependIcon"
              class="me-2"
              size="20"
            />
            <span class="text-base">{{ folder.title }}</span>

            <VSpacer />

            <VBadge
              v-if="folder.badge?.content"
              size="x-small"
              variant="tonal"
              inline
              class="v-badge--tonal badge-custom-padding"
              :color="folder.badge.color"
              :content="folder.badge.content"
            />
          </li>
        </RouterLink>

        <!-- 👉 Labels -->
        <li class="text-sm d-block text-uppercase text-disabled mt-6 mb-3">
          LABELS
        </li>
        <RouterLink
          v-for="label in labels"
          :key="label.title"
          v-slot="{ isActive, href, navigate }"
          class="d-flex align-center"
          :to="label.to"
          custom
        >
          <li
            v-bind="$attrs"
            :href="href"
            :class="isActive && 'email-label-active text-primary'"
            class="cursor-pointer"
            @click="navigate"
          >
            <VIcon
              :color="label.color"
              icon="ri-circle-fill"
              size="12"
              class="me-2"
            />
            <span class="text-body-1 text-high-emphasis d-inline-block">{{ label.title }}</span>
          </li>
        </RouterLink>
      </ul>
    </PerfectScrollbar>
  </div>
</template>

<style lang="scss">
.email-filters-labels {
  > li {
    position: relative;
    margin-block-end: 4px;
    padding-block: 4px;
    padding-inline: 20px;

    .badge-custom-padding {
      .v-badge__wrapper {
        margin: 0 !important;
      }
    }
  }

  .email-filter-active,
  .email-label-active {
    &::after {
      position: absolute;
      background: currentcolor;
      block-size: 100%;
      content: "";
      inline-size: 3px;
      inset-block-start: 0;
      inset-inline-start: 0;
    }
  }
}
</style>
