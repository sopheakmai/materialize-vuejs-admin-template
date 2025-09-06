<script setup lang="ts">
import flagAus from '@images/icons/countries/au.png'
import flagBrazil from '@images/icons/countries/br.png'
import flagChina from '@images/icons/countries/cn.png'
import flagFr from '@images/icons/countries/fr.png'
import flagIndia from '@images/icons/countries/in.png'
import flagUsa from '@images/icons/countries/us.png'

const subscribers = [
  {
    country: 'USA',
    subscribers: '22,450',
    trendNumber: 22.5,
    flag: flagUsa,
  },
  {
    country: 'India',
    subscribers: '18,568',
    trendNumber: 18.5,
    flag: flagIndia,
  },
  {
    country: 'Brazil',
    subscribers: '8,457',
    trendNumber: -8.3,
    flag: flagBrazil,
  },
  {
    country: 'Australia',
    subscribers: '2,850',
    trendNumber: 15.2,
    flag: flagAus,
  },
  {
    country: 'France',
    subscribers: '1,930',
    trendNumber: -12.6,
    flag: flagFr,
  },
  {
    country: 'China',
    subscribers: '852',
    trendNumber: -2.4,
    flag: flagChina,
  },
]

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]
</script>

<template>
  <VCard title="Subscribers By Countries">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VTable class="subscriber-table text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            <div class="text-overline">
              Countries
            </div>
          </th>
          <th scope="col">
            <div class="text-overline">
              Subscribers
            </div>
          </th>
          <th
            scope="col"
            class="text-end"
          >
            <div class="text-overline">
              Percent
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="font-weight-medium text-base text-high-emphasis">
        <tr
          v-for="subscriber in subscribers"
          :key="subscriber.country"
        >
          <td>
            <div class="d-flex align-center">
              <VAvatar
                :image="subscriber.flag"
                :size="30"
                class="me-4"
              />
              <span>{{ subscriber.country }}</span>
            </div>
          </td>

          <td class="text-center text-medium-emphasis">
            {{ subscriber.subscribers }}
          </td>

          <td>
            <div
              class="d-flex justify-end align-center"
              :class="subscriber.trendNumber > 0 ? 'text-success' : 'text-error'"
            >
              <span class="me-1">{{ subscriber.trendNumber > 0 ? `+${subscriber.trendNumber}` : subscriber.trendNumber }}%</span>

              <VIcon
                :icon="subscriber.trendNumber > 0 ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
                size="24"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<style lang="scss" scoped>
.subscriber-table {
  tbody {
    td {
      border-block-end: none !important;
    }
  }

  &.v-table {
    .v-table__wrapper {
      table {
        thead {
          tr {
            th {
              background-color: rgba(var(--v-theme-surface)) !important;
              block-size: 46px !important;
              border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity)) !important;
            }
          }
        }

        tbody {
          tr {
            td {
              --v-table-row-height: 66px;
            }
          }
        }
      }
    }
  }
}
</style>
