<script setup lang="ts">
import { ref } from 'vue'

const optionCounter = ref(1)

const content = ref(
  `<p>
      This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That's it. It's probably too much for real minimalists though.
    </p>
    <p>
      The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
    </p>`)

const activeTab = ref('Restock')

const shippingList = [
  { desc: 'You\'ll be responsible for product delivery.Any damage or delay during shipping may cost you a Damage fee', title: 'Fulfilled by Seller', value: 'Fulfilled by Seller' },
  { desc: 'Your product, Our responsibility.For a measly fee, we will handle the delivery process for you.', title: 'Fulfilled by Company name', value: 'Fulfilled by Company name' },
] as const

const shippingType = ref<typeof shippingList[number]['value']>('Fulfilled by Company name')
const deliveryType = ref('Worldwide delivery')
const selectedAttrs = ref(['Biodegradable', 'Expiry Date'])

const inventoryTabsData = [
  { icon: 'ri-add-line', title: 'Restock', value: 'Restock' },
  { icon: 'ri-car-line', title: 'Shipping', value: 'Shipping' },
  { icon: 'ri-global-line', title: 'Global Delivery', value: 'Global Delivery' },
  { icon: 'ri-link-m', title: 'Attributes', value: 'Attributes' },
  { icon: 'ri-lock-unlock-line', title: 'Advanced', value: 'Advanced' },
]

const inStock = ref(true)
const isTaxable = ref(true)
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-space-between gap-4 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 mb-1">
          Add a new product
        </h4>
        <p class="text-body-1 mb-0">
          Orders placed across your store
        </p>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="outlined"
          color="secondary"
        >
          Discard
        </VBtn>
        <VBtn
          variant="outlined"
          color="primary"
        >
          Save Draft
        </VBtn>
        <VBtn>Publish Product</VBtn>
      </div>
    </div>

    <VRow>
      <VCol md="8">
        <!-- 👉 Product Information -->
        <VCard
          class="mb-6"
          title="Product Information"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VTextField
                  label="Product Name"
                  placeholder="iPhone 14"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  label="SKU"
                  placeholder="FXSK123U"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  label="Barcode"
                  placeholder="0123-4567"
                />
              </VCol>
              <VCol>
                <VLabel class="mb-1">
                  Description (Optional)
                </VLabel>
                <TiptapEditor
                  v-model="content"
                  class="border rounded-lg"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- 👉 Product Image -->
        <VCard class="mb-6">
          <VCardItem>
            <template #title>
              Product Image
            </template>
            <template #append>
              <h6 class="text-h6 text-primary cursor-pointer">
                Add Media from URL
              </h6>
            </template>
          </VCardItem>

          <VCardText>
            <DropZone />
          </VCardText>
        </VCard>

        <!-- 👉 Variants -->
        <VCard
          title="Variants"
          class="mb-6"
        >
          <VCardText>
            <template
              v-for="i in optionCounter"
              :key="i"
            >
              <VRow>
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    :items="['Size', 'Color', 'Weight']"
                    placeholder="Select Variant"
                    label="Select Variant"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="8"
                >
                  <VTextField
                    label="Variant Value"
                    type="number"
                    placeholder="Enter Variant Value"
                  />
                </VCol>
              </VRow>
            </template>

            <VBtn
              class="mt-6"
              prepend-icon="ri-add-line"
              @click="optionCounter++"
            >
              Add another option
            </VBtn>
          </VCardText>
        </VCard>

        <!-- 👉 Inventory -->
        <VCard
          title="Inventory"
          class="inventory-card"
        >
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="4"
                :class="$vuetify.display.mdAndUp ? 'border-e' : 'border-b pb-6'"
              >
                <div class="pe-3">
                  <VTabs
                    v-model="activeTab"
                    direction="vertical"
                    color="primary"
                    class="v-tabs-pill"
                  >
                    <VTab
                      v-for="(tab, index) in inventoryTabsData"
                      :key="index"
                      :value="tab.value"
                    >
                      <VIcon
                        :icon="tab.icon"
                        class="me-2"
                      />
                      <span>{{ tab.title }}</span>
                    </VTab>
                  </VTabs>
                </div>
              </VCol>

              <VCol
                cols="12"
                md="8"
                :class="$vuetify.display.mdAndDown ? 'pt-6' : ''"
              >
                <VWindow
                  v-model="activeTab"
                  class="w-100"
                  :touch="false"
                >
                  <VWindowItem value="Restock">
                    <div class="d-flex flex-column gap-y-4 ps-md-3">
                      <div class="text-body-1 font-weight-medium">
                        Options
                      </div>
                      <div class="d-flex gap-x-4 align-center">
                        <VTextField
                          label="Add to stock"
                          placeholder="100"
                          density="compact"
                        />
                        <VBtn prepend-icon="ri-check-line">
                          Confirm
                        </VBtn>
                      </div>
                      <div class="d-flex flex-column gap-2 text-high-emphasis">
                        <div>
                          Product in stock now: <span class="font-weight-medium">54</span>
                        </div>
                        <div>
                          Product in transit: <span class="font-weight-medium">390</span>
                        </div>
                        <div>
                          Last time restocked: <span class="font-weight-medium">24th June, 2022</span>
                        </div>
                        <div>
                          Total stock over lifetime: <span class="font-weight-medium">2,430</span>
                        </div>
                      </div>
                    </div>
                  </VWindowItem>

                  <VWindowItem value="Shipping">
                    <VRadioGroup
                      v-model="shippingType"
                      class="ps-md-3"
                    >
                      <template #label>
                        <span class="font-weight-medium mb-1">Shipping Type</span>
                      </template>
                      <VRadio
                        v-for="item in shippingList"
                        :key="item.value"
                        :value="item.value"
                        class="mb-4"
                        inline
                      >
                        <template #label>
                          <div>
                            <div class="text-high-emphasis font-weight-medium mb-1">
                              {{ item.title }}
                            </div>
                            <div class="text-sm">
                              {{ item.desc }}
                            </div>
                          </div>
                        </template>
                      </VRadio>
                    </VRadioGroup>
                  </VWindowItem>

                  <VWindowItem value="Global Delivery">
                    <div class="ps-md-3">
                      <VRadioGroup v-model="deliveryType">
                        <template #label>
                          <span class="font-weight-medium mb-1">Global Delivery</span>
                        </template>

                        <VRadio
                          value="Worldwide delivery"
                          class="mb-4"
                        >
                          <template #label>
                            <div>
                              <div class="text-high-emphasis font-weight-medium mb-1">
                                Worldwide delivery
                              </div>
                              <div class="text-sm">
                                Only available with Shipping method:
                                <span class="text-primary">
                                  Fulfilled by Company name
                                </span>
                              </div>
                            </div>
                          </template>
                        </VRadio>

                        <VRadio
                          value="Selected Countries"
                          class="mb-4"
                        >
                          <template #label>
                            <div>
                              <div class="text-high-emphasis font-weight-medium mb-1">
                                Selected Countries
                              </div>
                              <VTextField
                                placeholder="USA"
                                density="compact"
                                style="min-inline-size: 200px;"
                              />
                            </div>
                          </template>
                        </VRadio>

                        <VRadio>
                          <template #label>
                            <div>
                              <div class="text-high-emphasis font-weight-medium mb-1">
                                Local delivery
                              </div>
                              <div class="text-sm">
                                Deliver to your country of residence
                                <span class="text-primary">
                                  Change profile address
                                </span>
                              </div>
                            </div>
                          </template>
                        </VRadio>
                      </VRadioGroup>
                    </div>
                  </VWindowItem>

                  <VWindowItem value="Attributes">
                    <div class="ps-md-3">
                      <div class="mb-2 text-base font-weight-medium">
                        Attributes
                      </div>
                      <div>
                        <VCheckbox
                          v-model="selectedAttrs"
                          label="Fragile Product"
                          value="Fragile Product"
                          class="ps-3"
                        />
                        <VCheckbox
                          v-model="selectedAttrs"
                          value="Biodegradable"
                          label="Biodegradable"
                          class="ps-3 mb-1"
                        />
                        <VCheckbox
                          v-model="selectedAttrs"
                          value="Frozen Product"
                          class="ps-3 mb-1"
                        >
                          <template #label>
                            <div class="d-flex flex-column mb-1">
                              <div>Frozen Product</div>
                              <VTextField
                                placeholder="40 C"
                                type="number"
                                density="compact"
                              />
                            </div>
                          </template>
                        </VCheckbox>
                        <VCheckbox
                          v-model="selectedAttrs"
                          value="Expiry Date"
                          class="ps-3"
                        >
                          <template #label>
                            <div class="d-flex flex-column mb-1">
                              <div>Expiry Date of Product</div>
                              <AppDateTimePicker
                                model-value="2025-06-14"
                                density="compact"
                                placeholder="Select a Date"
                              />
                            </div>
                          </template>
                        </VCheckbox>
                      </div>
                    </div>
                  </VWindowItem>

                  <VWindowItem value="Advanced">
                    <div class="ps-md-3">
                      <div class="mb-3 text-base font-weight-medium">
                        Advanced
                      </div>
                      <VRow>
                        <VCol
                          cols="12"
                          sm="6"
                          md="7"
                        >
                          <VSelect
                            style="min-inline-size: 200px;"
                            label="Product ID Type"
                            placeholder="Select Product Type"
                            :items="['ISBN', 'UPC', 'EAN', 'JAN']"
                            density="compact"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          sm="6"
                          md="5"
                        >
                          <VTextField
                            label="Product Id"
                            placeholder="100023"
                            type="number"
                            density="compact"
                          />
                        </VCol>
                      </VRow>
                    </div>
                  </VWindowItem>
                </VWindow>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        md="4"
        cols="12"
      >
        <!-- 👉 Pricing -->
        <VCard
          title="Pricing"
          class="mb-6"
        >
          <VCardText>
            <VTextField
              label="Base Price"
              placeholder="iPhone 14"
              class="mb-6"
            />
            <VTextField
              label="Discounted Price"
              placeholder="$499"
              class="mb-6"
            />
            <VCheckbox
              v-model="isTaxable"
              label="Charge Tax on this product"
            />

            <VDivider class="my-2" />

            <div class="d-flex flex-raw align-center justify-space-between ">
              <span>In stock</span>
              <VSwitch
                v-model="inStock"
                density="compact"
              />
            </div>
          </VCardText>
        </VCard>

        <!-- 👉 Organize -->
        <VCard title="Organize">
          <VCardText>
            <div class="d-flex flex-column gap-y-5">
              <VSelect
                placeholder="Select Vendor"
                label="Vendor"
                :items="['Men\'s Clothing', 'Women\'s Clothing', 'Kid\'s Clothing']"
              />
              <VSelect
                placeholder="Select Category"
                label="Category"
                :items="['Household', 'Office', 'Electronics', 'Management', 'Automotive']"
              >
                <template #append>
                  <IconBtn
                    size="large"
                    variant="outlined"
                    color="primary"
                    rounded
                  >
                    <VIcon
                      size="28"
                      icon="ri-add-line"
                    />
                  </IconBtn>
                </template>
              </VSelect>
              <VSelect
                placeholder="Select Collection"
                label="Collection"
                :items="['Men\'s Clothing', 'Women\'s Clothing', 'Kid\'s Clothing']"
              />
              <VSelect
                placeholder="Select Status"
                label="Status"
                :items="['Published', 'Inactive', 'Scheduled']"
              />
              <VTextField
                label="Tags"
                placeholder="Fashion, Trending, Summer"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
  .drop-zone {
    border: 1px dashed rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 8px;
  }
</style>

<style lang="scss">
.inventory-card {
  .v-radio-group,
  .v-checkbox {
    .v-selection-control {
      align-items: start !important;
    }

    .v-label.custom-input {
      border: none !important;
    }
  }
}

.ProseMirror {
  p {
    margin-block-end: 0;
  }

  padding: 0.5rem;
  outline: none;

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
}
</style>
