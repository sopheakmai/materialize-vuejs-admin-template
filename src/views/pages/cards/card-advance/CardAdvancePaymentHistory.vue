<script setup lang="ts">
import americanExpressDark from '@images/icons/payments/img/ae-dark.png'
import americanExpressLight from '@images/icons/payments/img/american-express.png'
import mastercardDark from '@images/icons/payments/img/master-dark.png'
import mastercardLight from '@images/icons/payments/img/mastercard.png'
import visaDark from '@images/icons/payments/visa-dark.png'
import visaLight from '@images/icons/payments/visa-light.png'

const visa = useGenerateImageVariant(visaLight, visaDark)
const mastercard = useGenerateImageVariant(mastercardLight, mastercardDark)
const americanExpress = useGenerateImageVariant(americanExpressLight, americanExpressDark)

const payments = ref([
  {
    lastDigits: '4399',
    method: 'Credit Card',
    date: '05/Jan',
    debitAmount: '2,820',
    balance: '10,450',
    logo: visa,
  },
  {
    lastDigits: '5545',
    method: 'Debit Card',
    date: '12/Feb',
    debitAmount: '345',
    balance: '8,709',
    logo: mastercard,
  },
  {
    lastDigits: '9860',
    method: 'ATM Card',
    date: '24/Feb',
    debitAmount: '999',
    balance: '25,900',
    logo: americanExpress,
  },
  {
    lastDigits: '4300',
    method: 'Credit Card',
    date: '08/Mar',
    debitAmount: '8,453',
    balance: '9,233',
    logo: visa,
  },
  {
    lastDigits: '5545',
    method: 'Debit Card',
    date: '15/Apr',
    debitAmount: '24',
    balance: '500',
    logo: mastercard,
  },
  {
    lastDigits: '4399',
    method: 'Credit Card',
    date: '28/Apr',
    debitAmount: '299',
    balance: '1,380',
    logo: visa,
  },
])

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]
</script>

<template>
  <VCard title="Payment History">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VTable class="payment-history-table text-no-wrap">
      <thead class="text-capitalize">
        <tr>
          <th scope="col">
            <div class="text-overline">
              Card
            </div>
          </th>
          <th
            scope="col"
            class="text-start text-sm"
          >
            <div class="text-overline">
              Date
            </div>
          </th>
          <th
            scope="col"
            class="text-end"
          >
            <div class="text-overline">
              Spend
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="text-sm py-4">
        <tr
          v-for="payment in payments"
          :key="payment.lastDigits"
        >
          <td>
            <div class="d-flex align-center">
              <div class="me-4">
                <div class="rounded-lg d-flex align-center justify-center">
                  <img
                    :src="payment.logo"
                    alt="payment-card"
                  >
                </div>
              </div>

              <div class="d-flex flex-column">
                <h6 class="text-h6">
                  *{{ payment.lastDigits }}
                </h6>
                <span class="text-body-2">{{ payment.method }}</span>
              </div>
            </div>
          </td>

          <td>
            <span class="text-body-2">{{ payment.date }}</span>
          </td>

          <td class="text-end">
            <div class="d-flex flex-column">
              <h6 class="text-h6">
                -${{ payment.debitAmount }}
              </h6>
              <span class="text-body-2">${{ payment.balance }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<style lang="scss">
.payment-history-table {
  tbody {
    td {
      block-size: 1.5rem;
      border-block-end: none !important;
      padding-block: 1.5rem;
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
