<script lang="ts" setup>
const svgFiles = import.meta.glob('@/assets/svg/*/*.svg', { as: 'raw' })
const folders = Object.keys(svgFiles).reduce<string[]>((acc, filePath) => {
  try {
    if (!filePath || typeof filePath !== 'string') {
      console.warn('Invalid file path:', filePath)
      return acc
    }

    const parts = filePath.split('/')
    if (parts.length < 2) {
      console.warn('Invalid path structure:', filePath)
      return acc
    }

    const folderName = parts[parts.length - 2]
    const fileName = parts[parts.length - 1]

    if (!folderName || !fileName) {
      console.warn('Missing folder or file name:', filePath)
      return acc
    }

    const fileBaseName = fileName.split('.')[0]

    if (!fileBaseName) {
      console.warn('Invalid file name:', fileName)
      return acc
    }

    const sanitizedFolder = folderName.replace(/[^\w-]/g, '')
    const sanitizedFile = fileBaseName.replace(/[^\w-]/g, '')

    if (!sanitizedFolder || !sanitizedFile) {
      console.warn('Invalid characters in path:', filePath)
      return acc
    }

    const iconName = `${sanitizedFolder}-${sanitizedFile}`

    // Avoid duplicates
    if (!acc.includes(iconName)) {
      acc.push(iconName)
    }

    return acc
  }
  catch (error) {
    console.error('Error processing file path:', filePath, error)
    return acc
  }
}, [])
</script>

<template>
  <div>
    <h1>Core Icons Page</h1>
    <p>This is the core icons page.</p>

    <div v-if="folders.length > 0" class="mt-4">
      <h3>Found {{ folders.length }} icons:</h3>
      <div class="d-flex flex-wrap gap-2 mt-2 cursor-pointer">
        <VChip
          v-for="iconName in folders"
          :key="iconName"
          size="small"
          color="primary"
          variant="outlined"
        >
          <VIcon :icon="iconName" class="me-2" />
          {{ iconName }}
        </VChip>
      </div>
    </div>

    <div v-else class="mt-4">
      <VAlert
        type="warning"
        title="No Icons Found"
        text="No SVG files found in src/assets/svg/*/ directories. Please add SVG files to display icons."
      />
    </div>
  </div>
</template>

<style lang="scss">

</style>
