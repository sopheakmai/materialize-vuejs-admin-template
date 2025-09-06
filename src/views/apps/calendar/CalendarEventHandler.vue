<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { useCalendarStore } from './useCalendarStore'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  event: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'addEvent',
  'updateEvent',
  'removeEvent',
])

const store = useCalendarStore()
const refForm = ref()

// 👉 Event
const event = ref(JSON.parse(JSON.stringify(props.event)))

const resetEvent = () => {
  event.value = JSON.parse(JSON.stringify(props.event))
  nextTick(() => {
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, resetEvent)

const removeEvent = () => {
  emit('removeEvent', String(event.value.id))

  // Close drawer
  emit('update:isDrawerOpen', false)
}

const handleSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {

      // If id exist on id => Update event
      if ('id' in event.value)
        emit('updateEvent', event.value)

      // Else => add new event
      else
        emit('addEvent', event.value)

      // Close drawer
      emit('update:isDrawerOpen', false)
    }
  })
}

const guestsOptions = [
  {
    avatar: avatar1,
    name: 'Jane Foster',
  },
  {
    avatar: avatar3,
    name: 'Donna Frank',
  },
  {
    avatar: avatar5,
    name: 'Gabrielle Robertson',
  },
  {
    avatar: avatar7,
    name: 'Lori Spears',
  },
  {
    avatar: avatar6,
    name: 'Sandy Vega',
  },
  {
    avatar: avatar2,
    name: 'Cheryl May',
  },
]

// 👉 Form
const onCancel = () => {

  // Close drawer
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    resetEvent()
    refForm.value?.resetValidation()
  })
}

const startDateTimePickerConfig = computed(() => {
  const config = {
    enableTime: !event.value.allDay,
    dateFormat: `Y-m-d${ event.value.allDay ? '' : ' H:i' }`,
  }

  if (event.value.end)
    config.maxDate = event.value.end
  
  return config
})

const endDateTimePickerConfig = computed(() => ({
  enableTime: !event.value.allDay,
  dateFormat: `Y-m-d${ event.value.allDay ? '' : ' H:i' }`,
  minDate: event.value.start || undefined,
}))

const dialogModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    data-allow-mismatch
    temporary
    location="end"
    :model-value="props.isDrawerOpen"
    width="420"
    class="scrollable-content"
    border="none"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="event.id ? 'Update Event' : 'Add Event'"
      @cancel="$emit('update:isDrawerOpen', false)"
    >
      <template #beforeClose>
        <IconBtn
          v-show="event.id"
          size="large"
          class="text-medium-emphasis"
          @click="removeEvent"
        >
          <VIcon icon="ri-delete-bin-7-line" />
        </IconBtn>
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- SECTION Form -->
          <VForm
            ref="refForm"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- 👉 Title -->
              <VCol cols="12">
                <VTextField
                  id="event-title"
                  v-model="event.title"
                  label="Title"
                  placeholder="Meeting with Jane"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- 👉 Calendar -->
              <VCol cols="12">
                <VSelect
                  id="event-label"
                  v-model="event.extendedProps.calendar"
                  label="Label"
                  placeholder="Select Event Label"
                  :rules="[requiredValidator]"
                  :items="store.availableCalendars"
                  :item-title="item => item.label"
                  :item-value="item => item.label"
                >
                  <template #selection="{ item }">
                    <div
                      v-show="event.extendedProps.calendar"
                      class="align-center"
                      :class="event.extendedProps.calendar ? 'd-flex' : ''"
                    >
                      <VIcon
                        size="8"
                        icon="ri-circle-fill"
                        :color="item.raw.color"
                        class="me-2"
                      />
                      <span>{{ item.raw.label }}</span>
                    </div>
                  </template>

                  <template #item="{ item, props: itemProps }">
                    <VListItem v-bind="itemProps">
                      <template #prepend>
                        <VIcon
                          size="8"
                          icon="ri-circle-fill"
                          :color="item.raw.color"
                        />
                      </template>
                    </VListItem>
                  </template>
                </VSelect>
              </VCol>

              <!-- 👉 Start date -->
              <VCol cols="12">
                <AppDateTimePicker
                  id="event-start-date"
                  :key="JSON.stringify(startDateTimePickerConfig)"
                  v-model="event.start"
                  :rules="[requiredValidator]"
                  label="Start date"
                  placeholder="Select Date"
                  :config="startDateTimePickerConfig"
                />
              </VCol>

              <!-- 👉 End date -->
              <VCol cols="12">
                <AppDateTimePicker
                  id="event-end-date"
                  :key="JSON.stringify(endDateTimePickerConfig)"
                  v-model="event.end"
                  :rules="[requiredValidator]"
                  label="End date"
                  placeholder="Select End Date"
                  :config="endDateTimePickerConfig"
                />
              </VCol>

              <!-- 👉 All day -->
              <VCol cols="12">
                <VSwitch
                  id="event-all-day"
                  v-model="event.allDay"
                  label="All day"
                />
              </VCol>

              <!-- 👉 Event URL -->
              <VCol cols="12">
                <VTextField
                  id="event-url"
                  v-model="event.url"
                  label="Event URL"
                  placeholder="https://event.com/meeting"
                  :rules="[urlValidator]"
                  type="url"
                />
              </VCol>

              <!-- 👉 Guests -->
              <VCol cols="12">
                <VSelect
                  id="event-guests"
                  v-model="event.extendedProps.guests"
                  label="Guests"
                  placeholder="Select guests"
                  :items="guestsOptions"
                  :item-title="item => item.name"
                  :item-value="item => item.name"
                  chips
                  multiple
                  eager
                />
              </VCol>

              <!-- 👉 Location -->
              <VCol cols="12">
                <VTextField
                  id="event-location"
                  v-model="event.extendedProps.location"
                  label="Location"
                  placeholder="Meeting room"
                />
              </VCol>

              <!-- 👉 Description -->
              <VCol cols="12">
                <VTextarea
                  id="event-description"
                  v-model="event.extendedProps.description"
                  label="Description"
                  placeholder="Meeting description"
                />
              </VCol>

              <!-- 👉 Form buttons -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  variant="outlined"
                  color="secondary"
                  @click="onCancel"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        <!-- !SECTION -->
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
