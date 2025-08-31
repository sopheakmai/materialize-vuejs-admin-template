<script setup lang="ts">
import type { Options } from '@core/types'
import type { UserProperties } from '@/@fake-db/types'
import { avatarText } from '@core/utils/formatters'
import { VDataTableServer } from 'vuetify/components/VDataTable'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'

// 👉 Store
const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref<UserProperties[]>([])

const options = ref<Options>({
  page: 1,
  itemsPerPage: 7,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  { title: 'User', key: 'user' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
]

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    options: options.value,
  }).then((response) => {
    users.value = response.data.users
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
  }).catch((error) => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

const resolveUserRoleVariant = (role: string) => {
  const roleLowerCase = role.toLowerCase()

  if (roleLowerCase === 'subscriber')
    return { color: 'primary', icon: 'mdi-account-outline' }
  if (roleLowerCase === 'author')
    return { color: 'warning', icon: 'mdi-cog-outline' }
  if (roleLowerCase === 'maintainer')
    return { color: 'success', icon: 'mdi-chart-donut' }
  if (roleLowerCase === 'editor')
    return { color: 'info', icon: 'mdi-pencil-outline' }
  if (roleLowerCase === 'admin')
    return { color: 'error', icon: 'mdi-laptop' }

  return { color: 'primary', icon: 'mdi-account-outline' }
}

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

// 👉 Add new user
const addNewUser = (userData: UserProperties) => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VCard>
      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="users"
        :items-length="totalUsers"
        :headers="headers"
        class="text-no-wrap rounded-0"
        @update:options="options = $event"
      >
        <!-- User -->
        <template #item.user="{ item }">
          <div v-if="item" class="d-flex">
            <VAvatar
              size="34"
              :variant="!item.avatar ? 'tonal' : undefined"
              :color="!item.avatar ? resolveUserRoleVariant(item.role).color : undefined"
              class="me-3"
            >
              <VImg
                v-if="item.avatar"
                :src="item.avatar"
              />
              <span
                v-else
                class="text-sm font-weight-medium"
              >{{ avatarText(item.fullName) }}</span>
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-sm">
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: item.id } }"
                  class="font-weight-medium user-list-name"
                >
                  {{ item.fullName }}
                </RouterLink>
              </h6>

              <span class="text-xs text-medium-emphasis">@{{ item.username }}</span>
            </div>
          </div>
        </template>

        <!-- Email -->
        <template #item.email="{ item }">
          <span class="text-sm">{{ item.email }}</span>
        </template>

        <!-- Role -->
        <template #item.role="{ item }">
          <div class="d-flex gap-x-2">
            <VIcon
              :icon="resolveUserRoleVariant(item.role).icon"
              :color="resolveUserRoleVariant(item.role).color"
            />
            <span class="text-capitalize">{{ item.role }}</span>
          </div>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.status)"
            size="small"
            class="text-capitalize"
          >
            {{ item.status }}
          </VChip>
        </template>

        <!-- Pagination -->
        <template #bottom />
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:is-drawer-open="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
