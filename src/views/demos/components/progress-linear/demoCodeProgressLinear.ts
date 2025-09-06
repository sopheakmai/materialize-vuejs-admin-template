export const buffering = {
  ts: `<script setup lang="ts">
const modelValue = ref(10)
const bufferValue = ref(20)
const interval = ref()

const startBuffer = () => {
  clearInterval(interval.value)

  interval.value = setInterval(() => {
    modelValue.value += Math.random() * (15 - 5) + 5
    bufferValue.value += Math.random() * (15 - 5) + 6
  }, 2000)
}

onMounted(startBuffer)

onBeforeUnmount(() => {
  clearInterval(interval.value)
})

watch(modelValue, () => {
  if (modelValue.value < 100)
    return false

  modelValue.value = 0
  bufferValue.value = 10
  startBuffer()
})
</script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="modelValue"
      height="8"
      :buffer-value="bufferValue"
    />
  </div>
</template>
`,
  js: `<script setup>
const modelValue = ref(10)
const bufferValue = ref(20)
const interval = ref()

const startBuffer = () => {
  clearInterval(interval.value)
  interval.value = setInterval(() => {
    modelValue.value += Math.random() * (15 - 5) + 5
    bufferValue.value += Math.random() * (15 - 5) + 6
  }, 2000)
}

onMounted(startBuffer)
onBeforeUnmount(() => {
  clearInterval(interval.value)
})
watch(modelValue, () => {
  if (modelValue.value < 100)
    return false
  modelValue.value = 0
  bufferValue.value = 10
  startBuffer()
})
</script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="modelValue"
      height="8"
      :buffer-value="bufferValue"
    />
  </div>
</template>
`,
}

export const color = {
  ts: `<template>
  <div class="demo-space-y">
    <VProgressLinear model-value="15" />

    <VProgressLinear
      model-value="30"
      color="secondary"
    />

    <VProgressLinear
      model-value="45"
      color="success"
    />
  </div>
</template>
`,
  js: `<template>
  <div class="demo-space-y">
    <VProgressLinear model-value="15" />

    <VProgressLinear
      model-value="30"
      color="secondary"
    />

    <VProgressLinear
      model-value="45"
      color="success"
    />
  </div>
</template>
`,
}

export const indeterminate = {
  ts: `<template>
  <VProgressLinear indeterminate />
</template>
`,
  js: `<template>
  <VProgressLinear indeterminate />
</template>
`,
}

export const reversed = {
  ts: `<template>
  <VProgressLinear
    indeterminate
    reverse
  />
</template>
`,
  js: `<template>
  <VProgressLinear
    indeterminate
    reverse
  />
</template>
`,
}

export const rounded = {
  ts: `<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="78"
      height="8"
      rounded
    />

    <VProgressLinear
      model-value="20"
      height="20"
      rounded
    />

    <VProgressLinear
      model-value="33"
      height="20"
      rounded
    />
  </div>
</template>
`,
  js: `<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="78"
      height="8"
      rounded
    />

    <VProgressLinear
      model-value="20"
      height="20"
      rounded
    />

    <VProgressLinear
      model-value="33"
      height="20"
      rounded
    />
  </div>
</template>
`,
}

export const slots = {
  ts: `<script setup lang="ts">
const skill = ref(20)
const knowledge = ref(33)
const power = ref(78)
</script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="power"
      height="8"
    />

    <VProgressLinear
      v-model="skill"
      height="20"
    >
      <template #default="{ value }">
        <span>{{ Math.ceil(value) }}%</span>
      </template>
    </VProgressLinear>

    <VProgressLinear
      v-model="knowledge"
      height="20"
    >
      <span>{{ Math.ceil(knowledge) }}%</span>
    </VProgressLinear>
  </div>
</template>
`,
  js: `<script setup>
const skill = ref(20)
const knowledge = ref(33)
const power = ref(78)
</script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="power"
      height="8"
    />

    <VProgressLinear
      v-model="skill"
      height="20"
    >
      <template #default="{ value }">
        <span>{{ Math.ceil(value) }}%</span>
      </template>
    </VProgressLinear>

    <VProgressLinear
      v-model="knowledge"
      height="20"
    >
      <span>{{ Math.ceil(knowledge) }}%</span>
    </VProgressLinear>
  </div>
</template>
`,
}

export const striped = {
  ts: `<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="75"
      striped
    />

    <VProgressLinear
      color="success"
      model-value="55"
      striped
    />

    <VProgressLinear
      color="warning"
      model-value="35"
      striped
    />
  </div>
</template>
`,
  js: `<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="75"
      striped
    />

    <VProgressLinear
      color="success"
      model-value="55"
      striped
    />

    <VProgressLinear
      color="warning"
      model-value="35"
      striped
    />
  </div>
</template>
`,
}
