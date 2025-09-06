// Configuration for keep-alive behavior in tabs
export const keepAliveConfig = {
  // Maximum number of components to cache
  maxCachedComponents: 20,

  // Routes that should be excluded from caching
  excludedRoutes: [
    'login',
    'register',
    'forgot-password',
    'not-authorized',
    '404',
    'error',
  ],

  // Explicitly included routes (if empty, all routes not in excludedRoutes will be cached)
  includedRoutes: [],

  // Whether to use the tab ID as the cache key (recommended)
  useTabIdAsKey: true,
}
