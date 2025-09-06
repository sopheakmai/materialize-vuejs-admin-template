<script setup>
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import {
  EditorContent,
  useEditor,
} from '@tiptap/vue-3'

const emit = defineEmits(['close'])

const content = ref('')
const to = ref('')
const subject = ref('')
const message = ref('')
const cc = ref('')
const bcc = ref('')
const isEmailCc = ref(false)
const isEmailBcc = ref(false)

const resetValues = () => {
  to.value = subject.value = message.value = ''
}

const editor = useEditor({
  content: content.value,
  extensions: [
    StarterKit,
    Image,
    Placeholder.configure({ placeholder: 'Message' }),
    Underline,
    Link.configure({ openOnClick: false }),
  ],
  onUpdate() {
    if (!editor.value)
      return
    content.value = editor.value.getHTML()
  },
})

watch(() => content.value, () => {
  const isSame = editor.value?.getHTML() === content.value
  if (isSame)
    return
  editor.value?.commands.setContent(content.value)
})

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href

  // eslint-disable-next-line no-alert
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null)
    return

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    
    return
  }

  // update link
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {

  // eslint-disable-next-line no-alert
  const url = window.prompt('URL')
  if (url)
    editor.value?.chain().focus().setImage({ src: url }).run()
}
</script>

<template>
  <VCard
    class="email-compose-dialog"
    elevation="10"
    max-width="30vw"
  >
    <VCardItem class="py-3">
      <VCardTitle class="text-medium-emphasis">
        Compose Mail
      </VCardTitle>

      <template #append>
        <IconBtn
          size="small"
          icon="ri-subtract-line"
          @click="$emit('close')"
        />
        <IconBtn
          size="small"
          icon="ri-close-line"
          @click="$emit('close'); resetValues(); content = ''; isEmailCc = false; isEmailBcc = false;"
        >
          <VIcon icon="ri-close-line" />
        </IconBtn>
      </template>
    </VCardItem>

    <div class="pe-5">
      <VTextField
        v-model="to"
        density="compact"
      >
        <template #prepend-inner>
          <div class="text-body-1 text-disabled font-weight-medium">
            To:
          </div>
        </template>
        <template #append>
          <span class="d-flex text-body-1 cursor-pointer text-medium-emphasis">
            <span @click="isEmailCc = !isEmailCc">Cc</span>
            <span class="mx-1"> | </span>
            <span @click="isEmailBcc = !isEmailBcc">Bcc</span>
          </span>
        </template>
      </VTextField>
    </div>

    <VExpandTransition>
      <div v-if="isEmailCc">
        <VDivider />

        <VTextField
          v-model="cc"
          density="compact"
        >
          <template #prepend-inner>
            <div class="text-body-1 text-disabled font-weight-medium">
              Cc:
            </div>
          </template>
        </VTextField>
      </div>
    </VExpandTransition>

    <VExpandTransition>
      <div v-if="isEmailBcc">
        <VDivider />

        <VTextField
          v-model="bcc"
          density="compact"
        >
          <template #prepend-inner>
            <div class="text-body-1 text-disabled font-weight-medium">
              Bcc:
            </div>
          </template>
        </VTextField>
      </div>
    </VExpandTransition>

    <VDivider />

    <VTextField
      v-model="subject"
      density="compact"
    >
      <template #prepend-inner>
        <div class="text-body-1 text-disabled font-weight-medium">
          Subject:
        </div>
      </template>
    </VTextField>

    <VDivider />

    <!-- 👉 Tiptap Editor  -->
    <div class="tiptap-editor-wrapper">
      <div
        v-if="editor"
        class="d-flex flex-wrap gap-x-1 px-4 py-2"
      >
        <IconBtn
          size="small"
          rounded
          :color="editor.isActive('bold') ? 'primary' : ''"
          :variant="editor.isActive('bold') ? 'tonal' : 'text'"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <VIcon icon="ri-bold" />
        </IconBtn>

        <IconBtn
          size="small"
          rounded
          :color="editor.isActive('underline') ? 'primary' : ''"
          :variant="editor.isActive('underline') ? 'tonal' : 'text'"
          @click="editor.commands.toggleUnderline()"
        >
          <VIcon icon="ri-underline" />
        </IconBtn>

        <IconBtn
          size="small"
          rounded
          :color="editor.isActive('italic') ? 'primary' : ''"
          :variant="editor.isActive('italic') ? 'tonal' : 'text'"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <VIcon icon="ri-italic" />
        </IconBtn>

        <IconBtn
          size="small"
          rounded
          :color="editor.isActive('bulletList') ? 'primary' : ''"
          :variant="editor.isActive('bulletList') ? 'tonal' : 'text'"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <VIcon icon="ri-list-check" />
        </IconBtn>

        <IconBtn
          size="small"
          rounded
          :color="editor.isActive('orderedList') ? 'primary' : ''"
          :variant="editor.isActive('orderedList') ? 'tonal' : 'text'"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <VIcon icon="ri-list-ordered-2" />
        </IconBtn>

        <IconBtn
          size="small"
          rounded
          @click="setLink"
        >
          <VIcon icon="ri-links-line" />
        </IconBtn>

        <IconBtn
          size="small"
          rounded
          @click="addImage"
        >
          <VIcon icon="ri-image-line" />
        </IconBtn>
      </div>

      <VDivider />

      <div class="mx-5">
        <EditorContent :editor="editor" />
      </div>
    </div>

    <div class="d-flex align-center px-5 py-4 gap-4">
      <VBtn
        color="primary"
        append-icon="ri-send-plane-line"
        :disabled="to === '' ? true : false"
        @click="$emit('close'); content = ''; resetValues(); isEmailCc = false; isEmailBcc = false;"
      >
        send
      </VBtn>

      <IconBtn size="small">
        <VIcon icon="ri-attachment-2" />
      </IconBtn>

      <VSpacer />

      <IconBtn size="small">
        <VIcon icon="ri-more-2-line" />
      </IconBtn>

      <IconBtn
        size="small"
        @click="$emit('close'); resetValues(); content = ''; isEmailCc = false; isEmailBcc = false;"
      >
        <VIcon icon="ri-delete-bin-7-line" />
      </IconBtn>
    </div>
  </VCard>
</template>

<style lang="scss">
.v-card.email-compose-dialog {
  z-index: 910 !important;

  .v-field--prepended {
    padding-inline-start: 20px;
  }

  .v-card-item {
    background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
  }

  .v-textarea .v-field {
    --v-field-padding-start: 20px;
  }

  .v-field__outline {
    display: none;
  }

  .ProseMirror {
    block-size: 150px;
    overflow-y: auto;
    padding-block: 0.5rem;

    &:focus-visible {
      outline: none;
    }

    p {
      margin-block-end: 0;
    }

    p.is-editor-empty:first-child::before {
      block-size: 0;
      color: #adb5bd;
      content: attr(data-placeholder);
      float: inline-start;
      pointer-events: none;
    }

    ul,
    ol {
      padding-inline: 1.125rem;
    }
  }
}
</style>
