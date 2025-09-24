<script lang="ts" setup>
const svgFiles = import.meta.glob('@/assets/svg/*/*.svg', {
  query: '?raw',
  import: 'default',
})

const allIcons = Object.keys(svgFiles).reduce<{ name: string, path: string }[]>((acc, filePath) => {
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
    if (!acc.find(item => item.name === iconName)) {
      acc.push({ name: iconName, path: filePath })
    }

    return acc
  }
  catch (error) {
    console.error('Error processing file path:', filePath, error)
    return acc
  }
}, [])

const { copiedText: copiedIcon, copyToClipboard } = useCopyToClipboard()
const { copiedText: copiedSvg, copyToClipboard: copySvgToClipboard } = useCopyToClipboard()

const itemsPerPage = 20
const currentPage = ref(0)
const loading = ref(false)
const hasMore = ref(true)
const displayedIcons = ref<{ name: string, path: string }[]>([])
const svgContentCache = ref<Map<string, string>>(new Map())

const loadMoreIcons = () => {
  if (loading.value || !hasMore.value)
    return

  loading.value = true
  setTimeout(() => {
    const startIndex = currentPage.value * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const newIcons = allIcons.slice(startIndex, endIndex)

    if (newIcons.length > 0) {
      displayedIcons.value.push(...newIcons)
      currentPage.value++
    }

    hasMore.value = endIndex < allIcons.length
    loading.value = false
  }, 300)
}

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    loadMoreIcons()
  }
}

const searchQuery = ref('')
const filteredIcons = computed(() => {
  if (!searchQuery.value) {
    return displayedIcons.value
  }
  return displayedIcons.value.filter((icon: { name: string }) =>
    icon.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  loadMoreIcons()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const loadingSvg = ref(false)

const copySvgContent = async (icon: { name: string, path: string }) => {
  loadingSvg.value = true

  const loadSvgContent = async (iconPath: string): Promise<string> => {
    if (svgContentCache.value.has(iconPath)) {
      return svgContentCache.value.get(iconPath)!
    }

    try {
      const svgModule = await svgFiles[iconPath]() as any
      const svgContent = typeof svgModule === 'string' ? svgModule : svgModule.default
      svgContentCache.value.set(iconPath, svgContent)
      return svgContent
    }
    catch (error) {
      console.error('Failed to load SVG:', iconPath, error)
      return ''
    }
  }

  try {
    const svgContent = await loadSvgContent(icon.path)
    await copySvgToClipboard(svgContent)
    copiedSvg.value = icon.path
  }
  catch (error) {
    console.error('❌ Failed to copy SVG content:', error)
  }
  finally {
    loadingSvg.value = false
  }
}
</script>

<template>
  <div class="pa-4">
    <VRow>
      <VCol cols="12">
        <h1 class="text-h4">
          Core Icons
        </h1>
        <p class="text-body-1">
          Browse and search through your icon collection with infinite scroll.
        </p>
      </VCol>
    </VRow>

    <!-- Search Bar -->
    <VRow class="mb-4">
      <VCol cols="12" md="6">
        <VTextField
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          label="Search icons..."
          variant="outlined"
          clearable
        />
      </VCol>
      <VCol cols="12" md="6" class="d-flex align-center">
        <VChip color="info" variant="outlined" class="me-2">
          Total: {{ allIcons.length }}
        </VChip>
        <VChip color="success" variant="outlined" class="me-2">
          Loaded: {{ displayedIcons.length }}
        </VChip>
        <VChip v-if="searchQuery" color="warning" variant="outlined">
          Filtered: {{ filteredIcons.length }}
        </VChip>
      </VCol>
    </VRow>

    <!-- Icons Grid -->
    <div v-if="filteredIcons.length > 0">
      <VRow>
        <VCol
          v-for="icon in filteredIcons"
          :key="icon.name"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          xl="2"
        >
          <VCard
            class="icon-card pa-3 text-center position-relative"
            variant="outlined"
            hover
            :class="{
              'icon-copied': copiedIcon === icon.name || copiedSvg === icon.path,
            }"
          >
            <!-- Copy Menu -->
            <VMenu>
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  size="x-small"
                  variant="text"
                  class="copy-menu-btn"
                />
              </template>
              <VList density="compact">
                <VListItem
                  prepend-icon="mdi-content-copy"
                  @click="copyToClipboard(icon.name)"
                >
                  <VListItemTitle>Copy Name</VListItemTitle>
                </VListItem>
                <VListItem
                  prepend-icon="mdi-code-tags"
                  @click="copySvgContent(icon)"
                >
                  <VListItemTitle>Copy SVG</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>

            <!-- Icon Display -->
            <div class="icon-display-area" @click="copyToClipboard(icon.name)">
              <VIcon
                :icon="icon.name"
                size="32"
                class="mb-2"
                color="primary"
              />
              <div class="text-caption text-truncate" :title="icon.name">
                {{ icon.name }}
              </div>
            </div>
          </VCard>
        </VCol>
      </VRow>

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center mt-6">
        <VProgressCircular
          indeterminate
          color="primary"
          size="32"
        />
        <p class="mt-2 text-body-2">
          Loading more icons...
        </p>
      </div>

      <!-- End Message -->
      <div v-else-if="!hasMore && !searchQuery" class="text-center mt-6">
        <VAlert
          type="success"
          variant="outlined"
          class="mx-auto"
          style="max-width: 400px;"
        >
          <VAlertTitle>All icons loaded!</VAlertTitle>
          <div>You've reached the end of the collection.</div>
        </VAlert>
      </div>
    </div>

    <!-- No Icons State -->
    <div v-else-if="displayedIcons.length === 0 && !loading">
      <VAlert
        type="warning"
        title="No Icons Found"
        text="No SVG files found in src/assets/svg/*/ directories. Please add SVG files to display icons."
        class="mt-4"
      />
    </div>

    <!-- No Search Results -->
    <div v-else-if="searchQuery && filteredIcons.length === 0">
      <VAlert
        type="info"
        title="No matching icons"
        :text="`No icons found matching '${searchQuery}'. Try a different search term.`"
        class="mt-4"
      />
    </div>

    <!-- Loading Overlay for SVG Copy -->
    <VOverlay
      v-model="loadingSvg"
      class="d-flex align-center justify-center"
      style="z-index: 9999;"
    >
      <VCard class="pa-4 text-center">
        <VProgressCircular
          indeterminate
          color="primary"
          size="32"
          class="mb-2"
        />
        <div class="text-body-2">
          Loading SVG content...
        </div>
      </VCard>
    </VOverlay>
  </div>
</template>

<style lang="scss" scoped>
.icon-card {
  transition: all 0.2s ease-in-out;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.icon-copied {
    border-color: rgb(var(--v-theme-success));
    background-color: rgba(var(--v-theme-success), 0.04);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .copy-menu-btn {
      opacity: 1;
    }
  }
}

.copy-menu-btn {
  position: absolute !important;
  top: 4px;
  right: 4px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.icon-display-area {
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // text-caption
  .text-caption {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

// Custom scrollbar for better UX
:deep(.v-application) {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

:deep(.v-application)::-webkit-scrollbar {
  width: 8px;
}

:deep(.v-application)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.v-application)::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

:deep(.v-application)::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
