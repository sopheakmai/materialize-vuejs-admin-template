<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center justify-space-between">
        <div class="text-body-1">
          Total Visits
        </div>
        <div class="d-flex justify-center">
          <span class="text-success">+18.2%</span>
          <VIcon
            icon="ri-arrow-up-s-line"
            color="success"
            size="20"
          />
        </div>
      </div>
      <h4 class="text-h4">
        $42.5k
      </h4>
    </VCardText>

    <VCardText>
      <VRow no-gutters>
        <VCol cols="5">
          <div class="d-flex align-center mb-2">
            <VAvatar
              rounded
              color="warning"
              variant="tonal"
              :size="24"
              class="me-2"
            >
              <VIcon
                size="16"
                icon="ri-pie-chart-2-line"
              />
            </VAvatar>

            <span>Mobile</span>
          </div>
          <h4 class="text-h4 mb-2">
            23.5%
          </h4>
          <div class="text-body-1">
            2,890
          </div>
        </VCol>

        <VCol cols="2">
          <div class="d-flex flex-column justify-center align-center h-100">
            <VDivider
              vertical
              class="mx-auto mb-2"
            />
            <VAvatar
              size="28"
              variant="tonal"
              class="text-body-2"
            >
              VS
            </VAvatar>
            <VDivider
              vertical
              class="mx-auto mt-2"
            />
          </div>
        </VCol>

        <VCol
          cols="5"
          class="text-end"
        >
          <div class="d-flex align-center justify-end mb-2">
            <span class="me-2">Desktop</span>

            <VAvatar
              rounded="sm"
              color="primary"
              variant="tonal"
              :size="24"
            >
              <VIcon
                size="16"
                icon="ri-mac-line"
              />
            </VAvatar>
          </div>
          <h4 class="text-h4 mb-2">
            23.5%
          </h4>
          <div class="text-body-1">
            2,890
          </div>
        </VCol>
      </VRow>

      <div class="mt-4">
        <VProgressLinear
          model-value="25"
          color="warning"
          bg-color="primary"
          bg-opacity="1"
          :rounded-bar="false"
          height="8"
          rounded
        />
      </div>
    </VCardText>
  </VCard>
</template>
