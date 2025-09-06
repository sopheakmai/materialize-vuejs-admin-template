import { canNavigate } from '@layouts/plugins/casl'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { isUserLoggedIn } from './utils'
import NProgress from '@/plugins/nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
      path: '/',
      redirect: () => ({ name: 'dashboards-crm' }),
    },
    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    {
      path: '/pages/account-settings',
      redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
    },
    ...setupLayouts(routes),
  ],
  scrollBehavior(to, from, savedPosition) {
    // Use saved position when using browser back/forward
    if (savedPosition) {
      return savedPosition
    }
    // Scroll to top for new navigation
    return { top: 0 }
  },
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to, from, next) => {
  // Start NProgress
  NProgress.start()

  // Prevent same-route navigation which can cause page reloads
  if (from.name === to.name
    && JSON.stringify(from.params) === JSON.stringify(to.params)
    && JSON.stringify(from.query) === JSON.stringify(to.query)) {
    NProgress.done()
    return next(false)
  }

  const isLoggedIn = isUserLoggedIn()

  /*

  ℹ️ Commented code is legacy code

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    // ℹ️ Only add `to` query param if `to` route is not index route
    if (!isLoggedIn)
      return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn)
    next('/')

  return next()

  */

  if (canNavigate(to)) {
    if (to.meta.redirectIfLoggedIn && isLoggedIn)
      return next({ name: 'dashboards-crm', replace: true })

    return next()
  }
  else {
    if (isLoggedIn) {
      return next({ name: 'not-authorized', replace: true })
    }
    else {
      return next({
        name: 'login',
        query: { to: to.name !== 'index' ? to.fullPath : undefined },
        replace: true,
      })
    }
  }
})

// Complete the progress bar when route change is complete
router.afterEach(() => {
  // Force complete NProgress to ensure it finishes
  setTimeout(() => {
    NProgress.done()
    // Add a small delay and force completion again to handle any edge cases
    setTimeout(() => {
      if ((NProgress as any)._active === true) {
        (NProgress as any).forceComplete()
      }
    }, 200)
  }, 0)
})

// Add a custom error handler to suppress NavigationDuplicated errors
// These occur when navigating to the same route multiple times
const originalPush = router.push
router.push = async function push(location) {
  try {
    return await originalPush.call(this, location)
  }
  catch (err) {
    if (typeof err === 'object' && err !== null && 'name' in err && (err as any).name !== 'NavigationDuplicated') {
      // rethrow the error if it's not a navigation duplicate
      return Promise.reject(err)
    }
    return await Promise.resolve()
  }
}

export default router
