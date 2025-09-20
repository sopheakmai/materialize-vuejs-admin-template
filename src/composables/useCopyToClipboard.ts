export default () => {
  const copiedText = ref<string>('')

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      copiedText.value = text
      setTimeout(() => {
        copiedText.value = ''
      }, 2000)
    }
    catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      copiedText.value = text
      setTimeout(() => {
        copiedText.value = ''
      }, 2000)
    }
  }

  return {
    copiedText,
    copyToClipboard,
  }
}
