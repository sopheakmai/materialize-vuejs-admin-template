<template>
  <VCard>
    <VCardText class="d-flex align-center gap-4 py-7">
      <VProgressCircular
        :size="64"
        :width="6"
        :model-value="70"
        color="primary"
      >
        <VIcon
          icon="ri-macbook-line"
          size="24"
        />
      </VProgressCircular>

      <div>
        <div class="d-flex align-center gap-1 mb-1">
          <h5 class="text-h5">
            84k
          </h5>
          <div class="text-error d-flex align-center">
            <span class="text-sm">-24%</span>
            <VIcon
              icon="ri-arrow-down-s-line"
              size="20"
            />
          </div>
        </div>
        <div>Total Impressions</div>
      </div>
    </VCardText>

    <VDivider />

    <VCardText class="d-flex align-center gap-4 py-7">
      <VProgressCircular
        :size="65"
        :width="6"
        :model-value="40"
        color="warning"
      >
        <VIcon
          icon="ri-handbag-line"
          size="24"
        />
      </VProgressCircular>

      <div>
        <div class="d-flex align-center gap-1 mb-1">
          <h5 class="text-h5">
            22k
          </h5>
          <div class="d-flex align-center">
            <div class="text-sm text-success">
              +15%
            </div>
            <VIcon
              icon="ri-arrow-up-s-line"
              size="20"
              color="success"
            />
          </div>
        </div>
        <span>Total Orders</span>
      </div>
    </VCardText>
  </VCard>
</template>
