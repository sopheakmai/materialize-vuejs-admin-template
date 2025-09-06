import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress Configuration
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
})

export default NProgress
