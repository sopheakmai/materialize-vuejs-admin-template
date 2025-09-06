<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useChat } from './useChat'
import { useChatStore } from '@/views/apps/chat/useChatStore'

const emit = defineEmits(['close'])


// composables
const store = useChatStore()
const { resolveAvatarBadgeVariant } = useChat()

const userStatusRadioOptions = [
  {
    title: 'Online',
    value: 'online',
    color: 'success',
  },
  {
    title: 'Away',
    value: 'away',
    color: 'warning',
  },
  {
    title: 'Do not Disturb',
    value: 'busy',
    color: 'error',
  },
  {
    title: 'Offline',
    value: 'offline',
    color: 'secondary',
  },
]

const isTwoStepVerified = ref(true)
const isNotificationEnabled = ref(false)
</script>

<template>
  <template v-if="store.profileUser">
    <!-- Close Button -->
    <div class="me-3 pt-3 text-end">
      <IconBtn @click="$emit('close')">
        <VIcon
          class="text-medium-emphasis"
          icon="ri-close-line"
          size="24"
        />
      </IconBtn>
    </div>

    <!-- User Avatar + Name + Role -->
    <div class="text-center px-6 mt-n2">
      <VBadge
        location="bottom right"
        offset-x="13"
        offset-y="7"
        bordered
        :color="resolveAvatarBadgeVariant(store.profileUser.status)"
        class="chat-user-profile-badge mb-4"
      >
        <VAvatar
          size="84"
          :variant="!store.profileUser.avatar ? 'tonal' : undefined"
          :color="!store.profileUser.avatar ? resolveAvatarBadgeVariant(store.profileUser.status) : undefined"
        >
          <VImg
            v-if="store.profileUser.avatar"
            :src="store.profileUser.avatar"
          />
          <span
            v-else
            class="text-3xl"
          >{{ avatarText(store.profileUser.fullName) }}</span>
        </VAvatar>
      </VBadge>
      <h5 class="text-h5">
        {{ store.profileUser.fullName }}
      </h5>
      <p class="text-body-1 text-capitalize mb-0">
        {{ store.profileUser.role }}
      </p>
    </div>

    <!-- User Data -->
    <PerfectScrollbar
      class="ps-chat-user-profile-sidebar-content pb-5 px-5"
      :options="{ wheelPropagation: false }"
    >
      <!-- About -->
      <div class="my-6 text-medium-emphasis">
        <p
          for="textarea-user-about"
          class="text-base text-disabled mb-0"
        >
          ABOUT
        </p>
        <VTextarea
          id="textarea-user-about"
          v-model="store.profileUser.about"
          auto-grow
          class="mt-1"
          rows="3"
        />
      </div>

      <!-- Status -->
      <div class="mb-6">
        <p class="text-base text-disabled mb-0">
          STATUS
        </p>
        <VRadioGroup
          v-model="store.profileUser.status"
          class="mt-1"
        >
          <VRadio
            v-for="(radioOption, index) in userStatusRadioOptions"
            :id="`${index}`"
            :key="radioOption.title"
            :name="radioOption.title"
            :label="radioOption.title"
            :value="radioOption.value"
            :color="radioOption.color"
          />
        </VRadioGroup>
      </div>

      <!-- Settings -->
      <div class="text-medium-emphasis chat-settings-section">
        <p class="text-base text-disabled mb-1">
          SETTINGS
        </p>
        <div class="d-flex align-center pa-2">
          <VIcon
            class="me-2"
            icon="ri-lock-password-line"
            size="22"
            color="high-emphasis"
          />
          <h6 class="text-h6 font-weight-regular">
            Two-step Verification
          </h6>

          <VSpacer />

          <VSwitch
            id="switch-two-step-verification"
            v-model="isTwoStepVerified"
            density="compact"
          />
        </div>
        <div class="d-flex align-center pa-2">
          <VIcon
            class="me-2"
            icon="ri-notification-line"
            size="22"
            color="high-emphasis"
          />
          <h6 class="text-h6 font-weight-regular">
            Notification
          </h6>

          <VSpacer />

          <VSwitch
            id="switch-notification"
            v-model="isNotificationEnabled"
          />
        </div>
        <div class="d-flex align-center pa-2">
          <VIcon
            class="me-2"
            icon="ri-user-add-line"
            size="22"
            color="high-emphasis"
          />
          <h6 class="text-h6 font-weight-regular">
            Invite Friends
          </h6>
        </div>
        <div class="d-flex align-center pa-2">
          <VIcon
            class="me-2"
            icon="ri-delete-bin-7-line"
            size="22"
            color="high-emphasis"
          />
          <h6 class="text-h6 font-weight-regular">
            Delete Account
          </h6>
        </div>
      </div>

      <!-- Logout Button -->
      <VBtn
        block
        color="primary"
        class="mt-11"
        append-icon="ri-logout-box-r-line"
      >
        Logout
      </VBtn>
    </PerfectScrollbar>
  </template>
</template>

<style lang="scss">
.chat-settings-section {
  .v-switch {
    .v-input__control {
      .v-selection-control__wrapper {
        block-size: 18px;
      }
    }
  }
}
</style>
