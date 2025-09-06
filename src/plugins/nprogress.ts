import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/styles/nprogress.scss'

// NProgress Configuration
NProgress.configure({
  easing: 'ease',
  speed: 400,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
  trickle: true,
})

// Add safeguards to prevent multiple start/done calls from causing issues
const safeNProgress = {
  _active: false,
  _pendingDone: false,
  _timeout: null as number | null,

  start() {
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }

    if (!this._active) {
      this._active = true
      this._pendingDone = false
      NProgress.start()
    }
  },

  done() {
    if (!this._active)
      return

    this._pendingDone = true

    // Delay the completion slightly to avoid flashes
    this._timeout = window.setTimeout(() => {
      this._active = false
      this._pendingDone = false
      NProgress.done()
      this._timeout = null
    }, 150) as unknown as number
  },

  // Force immediate completion
  forceComplete() {
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }

    this._active = false
    this._pendingDone = false
    NProgress.done()
  },
}

export default safeNProgress
