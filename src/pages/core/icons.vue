<script lang="ts" setup>
const svgFiles = import.meta.glob('@/assets/svg/*/*.svg', { as: 'raw' })

type IconData = {
  iconName: string
  fileName: string
  folderName: string
}

type SvgLoader = () => Promise<string>

const processIconFiles = () => {
  const iconsByFolder: Record<string, IconData[]> = {}

  Object.keys(svgFiles).forEach((filePath) => {
    try {
      if (!filePath || typeof filePath !== 'string') {
        console.warn('Invalid file path:', filePath)
        return
      }

      const parts = filePath.split('/')
      if (parts.length < 2) {
        console.warn('Invalid path structure:', filePath)
        return
      }

      const folderName = parts[parts.length - 2]
      const fileName = parts[parts.length - 1]

      if (!folderName || !fileName) {
        console.warn('Missing folder or file name:', filePath)
        return
      }

      const fileBaseName = fileName.split('.')[0]

      if (!fileBaseName) {
        console.warn('Invalid file name:', fileName)
        return
      }

      // Sanitize names (remove special characters, ensure valid format)
      const sanitizedFolder = folderName.replace(/[^\w-]/g, '')
      const sanitizedFile = fileBaseName.replace(/[^\w-]/g, '')

      if (!sanitizedFolder || !sanitizedFile) {
        console.warn('Invalid characters in path:', filePath)
        return
      }

      const iconName = `${sanitizedFolder}-${sanitizedFile}`

      // Initialize folder array if it doesn't exist
      if (!iconsByFolder[sanitizedFolder]) {
        iconsByFolder[sanitizedFolder] = []
      }

      // Check for duplicates within the folder
      const isDuplicate = iconsByFolder[sanitizedFolder].some(
        icon => icon.iconName === iconName,
      )

      if (!isDuplicate) {
        iconsByFolder[sanitizedFolder].push({
          iconName,
          fileName: sanitizedFile,
          folderName: sanitizedFolder,
        })
      }
    }
    catch (error) {
      console.error('Error processing file path:', filePath, error)
    }
  })

  return iconsByFolder
}

// Flatten icons for original UI display
const getFlatIconList = (iconsByFolder: Record<string, IconData[]>): string[] => {
  const flatList: string[] = []

  // Sort folders alphabetically, then add all icons from each folder
  Object.keys(iconsByFolder)
    .sort()
    .forEach((folderName) => {
      iconsByFolder[folderName]
        .sort((a, b) => a.fileName.localeCompare(b.fileName))
        .forEach((icon) => {
          flatList.push(icon.iconName)
        })
    })

  return flatList
}

// Part 2: Component State and UI Logic
const iconsByFolder = ref<Record<string, IconData[]>>(processIconFiles())
const folders = ref<string[]>(getFlatIconList(iconsByFolder.value))
const searchQuery = ref<string>('')

// Use the copy composable
const { copiedText: copiedIcon, copyToClipboard } = useCopyToClipboard()
const { copiedText: copiedSvg, copyToClipboard: copySvgToClipboard } = useCopyToClipboard()

const copyIconName = (iconName: string) => {
  copyToClipboard(iconName)
}

const getSvgFilePath = (folderName: string, fileName: string): string => {
  // Try exact match first
  const exactPath = `@/assets/svg/${folderName}/${fileName}.svg`
  if (svgFiles[exactPath]) {
    return exactPath
  }

  // Try to find matching file in available files
  const availableFiles = Object.keys(svgFiles)
  const matchingFile = availableFiles.find((path) => {
    const pathParts = path.split('/')
    const pathFolder = pathParts[pathParts.length - 2]
    const pathFile = pathParts[pathParts.length - 1]?.replace('.svg', '')
    return pathFolder === folderName && pathFile === fileName
  })

  return matchingFile || exactPath
}

const downloadBlob = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const copySvgContent = async (icon: IconData) => {
  try {
    const filePath = getSvgFilePath(icon.folderName, icon.fileName)
    console.log('📋 Copying SVG from:', filePath)

    const svgLoader = svgFiles[filePath] as SvgLoader

    if (!svgLoader) {
      console.error('❌ SVG file not found:', filePath)
      console.log('📂 Available files:', Object.keys(svgFiles))
      return
    }

    const svgContent = await svgLoader()
    console.log('✅ SVG content loaded, length:', svgContent.length)
    await copySvgToClipboard(svgContent)
  }
  catch (error) {
    console.error('❌ Failed to copy SVG content:', error)
  }
}

const downloadSvgFile = async (icon: IconData) => {
  try {
    console.log('🔍 Download request for icon:', icon)

    const filePath = getSvgFilePath(icon.folderName, icon.fileName)
    console.log('📁 Resolved file path:', filePath)
    console.log('📂 All available SVG files:', Object.keys(svgFiles))

    const svgLoader = svgFiles[filePath] as SvgLoader

    if (!svgLoader) {
      console.error('❌ SVG loader not found for path:', filePath)
      console.log('📂 Files in folder:', Object.keys(svgFiles).filter(key => key.includes(icon.folderName)))

      // Debug: Show what we're looking for vs what's available
      console.log('🔍 Looking for folder:', icon.folderName)
      console.log('🔍 Looking for file:', icon.fileName)
      console.log('🔍 Full icon name:', icon.iconName)

      return
    }

    console.log('⏳ Loading SVG content...')
    const svgContent = await svgLoader()
    console.log('✅ SVG loaded successfully, content length:', svgContent.length)
    console.log('📄 SVG preview:', `${svgContent.substring(0, 100)}...`)

    downloadBlob(svgContent, `${icon.fileName}.svg`)
    console.log('💾 Download initiated for:', `${icon.fileName}.svg`)
  }
  catch (error) {
    console.error('❌ Download failed with error:', error)
  }
}

// Computed property for filtered icons by search
const filteredIconsByFolder = computed(() => {
  if (!searchQuery.value.trim()) {
    return iconsByFolder.value
  }

  const query = searchQuery.value.toLowerCase().trim()
  const filtered: Record<string, IconData[]> = {}

  Object.entries(iconsByFolder.value).forEach(([folderName, icons]) => {
    const matchingIcons = (icons as IconData[]).filter((icon: IconData) =>
      icon.iconName.toLowerCase().includes(query)
      || icon.fileName.toLowerCase().includes(query)
      || folderName.toLowerCase().includes(query),
    )

    if (matchingIcons.length > 0) {
      filtered[folderName] = matchingIcons
    }
  })

  return filtered
})

// Computed property for total count
const totalIconCount = computed(() => {
  return Object.values(filteredIconsByFolder.value).reduce(
    (total, icons) => total + icons.length,
    0,
  )
})
</script>

<template>
  <div class="icons-page">
    <div v-if="Object.keys(iconsByFolder).length > 0" class="mt-4">
      <!-- Search Input -->
      <div class="search-container mb-6">
        <VTextField
          v-model="searchQuery"
          placeholder="Search icons by name, category, or keyword..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          clearable
          hide-details
          class="search-input"
        />
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar mb-6">
        <div class="stats-content">
          <VChip
            size="small"
            color="primary"
            variant="tonal"
            class="stats-chip"
          >
            <VIcon icon="mdi-image-outline" size="16" class="me-2" />
            {{ totalIconCount }} icons
          </VChip>

          <VChip
            v-if="!searchQuery"
            size="small"
            color="secondary"
            variant="tonal"
            class="stats-chip"
          >
            <VIcon icon="mdi-folder-outline" size="16" class="me-2" />
            {{ Object.keys(filteredIconsByFolder).length }} categories
          </VChip>

          <VChip
            v-if="searchQuery"
            size="small"
            color="info"
            variant="tonal"
            class="stats-chip"
          >
            <VIcon icon="mdi-filter-outline" size="16" class="me-2" />
            Filtered results
          </VChip>
        </div>

        <p class="helper-text">
          Click any icon to copy its name
        </p>
      </div>

      <!-- No results message -->
      <div v-if="totalIconCount === 0" class="no-results">
        <VCard class="text-center pa-8" variant="tonal">
          <VIcon icon="mdi-magnify-close" size="48" color="warning" class="mb-4" />
          <h3 class="text-h6 mb-2">
            No icons found
          </h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            No icons match "<strong>{{ searchQuery }}</strong>". Try a different search term.
          </p>
          <VBtn
            variant="outlined"
            size="small"
            @click="searchQuery = ''"
          >
            Clear search
          </VBtn>
        </VCard>
      </div>

      <!-- Icons grouped by folder -->
      <div class="icons-grid">
        <div v-for="(icons, folderName) in filteredIconsByFolder" :key="folderName" class="category-section">
          <div class="category-header">
            <h4 class="category-title">
              <VIcon icon="mdi-folder" size="20" class="me-2" />
              {{ folderName }}
            </h4>
            <VChip size="x-small" variant="text" class="category-count">
              {{ icons.length }} {{ icons.length === 1 ? 'icon' : 'icons' }}
            </VChip>
          </div>

          <div class="icons-container">
            <VCard
              v-for="icon in icons"
              :key="icon.iconName"
              class="icon-card"
              :class="{
                'icon-copied': copiedIcon === icon.iconName,
                'svg-copied': copiedSvg === icon.iconName,
              }"
              variant="outlined"
            >
              <VCardText class="icon-content">
                <div class="icon-display">
                  <VIcon :icon="icon.iconName" size="24" />
                </div>
                <div class="icon-info">
                  <div class="icon-name">
                    {{ icon.fileName }}
                  </div>
                  <div class="icon-full-name">
                    {{ icon.iconName }}
                  </div>
                </div>

                <!-- Action buttons -->
                <div class="icon-actions">
                  <VTooltip text="Copy icon name" location="top">
                    <template #activator="{ props }">
                      <VBtn
                        v-bind="props"
                        variant="text"
                        size="small"
                        icon
                        class="action-btn"
                        :color="copiedIcon === icon.iconName ? 'success' : 'primary'"
                        @click="copyIconName(icon.iconName)"
                      >
                        <VIcon
                          :icon="copiedIcon === icon.iconName ? 'mdi-check' : 'mdi-content-copy'"
                          size="16"
                        />
                      </VBtn>
                    </template>
                  </VTooltip>

                  <VTooltip text="Copy SVG content" location="top">
                    <template #activator="{ props }">
                      <VBtn
                        v-bind="props"
                        variant="text"
                        size="small"
                        icon
                        class="action-btn"
                        :color="copiedSvg === icon.iconName ? 'success' : 'secondary'"
                        @click="copySvgContent(icon)"
                      >
                        <VIcon
                          :icon="copiedSvg === icon.iconName ? 'mdi-check' : 'mdi-code-tags'"
                          size="16"
                        />
                      </VBtn>
                    </template>
                  </VTooltip>

                  <VTooltip text="Download SVG file" location="top">
                    <template #activator="{ props }">
                      <VBtn
                        v-bind="props"
                        variant="text"
                        size="small"
                        icon
                        class="action-btn"
                        color="info"
                        @click="downloadSvgFile(icon)"
                      >
                        <VIcon icon="mdi-download" size="16" />
                      </VBtn>
                    </template>
                  </VTooltip>
                </div>
              </VCardText>
            </VCard>
          </div>
        </div>
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
.icons-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.search-container {
  .search-input {
    max-width: 500px;
    margin: 0 auto;
  }
}

.stats-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);

  .stats-content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .helper-text {
    font-size: 0.875rem;
    color: rgba(var(--v-theme-on-surface), 0.6);
    margin: 0;
  }
}

.no-results {
  margin-top: 48px;
}

.icons-grid {
  .category-section {
    margin-bottom: 32px;
  }

  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 8px 0;

    .category-title {
      display: flex;
      align-items: center;
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: rgba(var(--v-theme-on-surface), 0.87);
    }

    .category-count {
      color: rgba(var(--v-theme-on-surface), 0.6);
    }
  }

  .icons-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 8px;
  }

  .icon-card {
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: rgb(var(--v-theme-primary));

      .icon-actions {
        opacity: 1;
      }
    }

    &.icon-copied {
      border-color: rgb(var(--v-theme-success));
      background-color: rgba(var(--v-theme-success), 0.04);
    }

    &.svg-copied {
      border-color: rgb(var(--v-theme-secondary));
      background-color: rgba(var(--v-theme-secondary), 0.04);
    }

    .icon-content {
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 60px;
    }

    .icon-display {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background-color: rgba(var(--v-theme-primary), 0.1);
      color: rgb(var(--v-theme-primary));
    }

    .icon-info {
      flex: 1;
      min-width: 0;

      .icon-name {
        font-weight: 600;
        font-size: 0.8rem;
        color: rgba(var(--v-theme-on-surface), 0.87);
        margin-bottom: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .icon-full-name {
        font-size: 0.7rem;
        color: rgba(var(--v-theme-on-surface), 0.6);
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .icon-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      opacity: 0;
      transition: opacity 0.2s;

      .action-btn {
        min-width: 28px !important;
        width: 28px;
        height: 28px;

        .v-icon {
          font-size: 14px;
        }

        &:hover {
          background-color: rgba(var(--v-theme-on-surface), 0.08);
        }
      }
    }

    // Always show actions on mobile
    @media (max-width: 768px) {
      .icon-actions {
        opacity: 0.7;
      }
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .icons-grid .icons-container {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .search-container .search-input {
    max-width: 100%;
  }
}
</style>
