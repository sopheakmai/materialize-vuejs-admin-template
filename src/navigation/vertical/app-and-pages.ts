export default [
  { heading: 'apps-and-pages' },
  {
    title: 'email',
    icon: { icon: 'mdi-email-outline' },
    to: 'apps-email',
  },
  {
    title: 'chat',
    icon: { icon: 'mdi-message-outline' },
    to: 'apps-chat',
  },
  {
    title: 'calendar',
    icon: { icon: 'mdi-calendar-blank-outline' },
    to: 'apps-calendar',
  },
  {
    title: 'invoice',
    icon: { icon: 'mdi-file-document-outline' },

    children: [
      { title: 'list', to: 'apps-invoice-list' },
      { title: 'preview', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
      { title: 'edit', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
      { title: 'add', to: 'apps-invoice-add' },
    ],
  },
  {
    title: 'user',
    icon: { icon: 'mdi-account-outline' },
    children: [
      { title: 'list', to: 'apps-user-list' },
      { title: 'view', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'roles-and-permissions',
    icon: { icon: 'mdi-shield-account-outline' },
    children: [
      { title: 'roles', to: 'apps-roles' },
      { title: 'permissions', to: 'apps-permissions' },
    ],
  },

  {
    title: 'pages',
    icon: { icon: 'mdi-file-outline' },
    children: [
      { title: 'help-center', to: 'pages-help-center' },
      { title: 'user-profile', to: { name: 'pages-user-profile-tab', params: { tab: 'profile' } } },
      { title: 'account-settings', to: { name: 'pages-account-settings-tab', params: { tab: 'account' } } },
      { title: 'pricing', to: 'pages-pricing' },
      { title: 'FAQ', to: 'pages-faq' },
      {
        title: 'miscellaneous',
        children: [
          { title: 'coming-soon', to: 'pages-misc-coming-soon', target: '_blank' },
          { title: 'under-maintenance', to: 'pages-misc-under-maintenance', target: '_blank' },
          { title: 'page-not-found-404', to: 'pages-misc-not-found', target: '_blank' },
          { title: 'not-authorized-401', to: 'pages-misc-not-authorized', target: '_blank' },
          { title: 'server-error-500', to: 'pages-misc-internal-server-error', target: '_blank' },
        ],
      },
    ],
  },
  {
    title: 'authentication',
    icon: { icon: 'mdi-lock-outline' },
    children: [
      {
        title: 'login',
        children: [
          { title: 'login-v1', to: 'pages-authentication-login-v1', target: '_blank' },
          { title: 'login-v2', to: 'pages-authentication-login-v2', target: '_blank' },
        ],
      },
      {
        title: 'register',
        children: [
          { title: 'register-v1', to: 'pages-authentication-register-v1', target: '_blank' },
          { title: 'register-v2', to: 'pages-authentication-register-v2', target: '_blank' },
          { title: 'register-multi-steps', to: 'pages-authentication-register-multi-steps', target: '_blank' },
        ],
      },
      {
        title: 'verify-email',
        children: [
          { title: 'verify-email-v1', to: 'pages-authentication-verify-email-v1', target: '_blank' },
          { title: 'verify-email-v2', to: 'pages-authentication-verify-email-v2', target: '_blank' },
        ],
      },
      {
        title: 'forgot-password',
        children: [
          { title: 'forgot-password-v1', to: 'pages-authentication-forgot-password-v1', target: '_blank' },
          { title: 'forgot-password-v2', to: 'pages-authentication-forgot-password-v2', target: '_blank' },
        ],
      },
      {
        title: 'reset-password',
        children: [
          { title: 'reset-password-v1', to: 'pages-authentication-reset-password-v1', target: '_blank' },
          { title: 'reset-password-v2', to: 'pages-authentication-reset-password-v2', target: '_blank' },
        ],
      },
      {
        title: 'two-steps',
        children: [
          { title: 'two-steps-v1', to: 'pages-authentication-two-steps-v1', target: '_blank' },
          { title: 'two-steps-v2', to: 'pages-authentication-two-steps-v2', target: '_blank' },
        ],
      },
    ],
  },
  {
    title: 'wizard-examples',
    icon: { icon: 'mdi-ray-start-vertex-end' },
    children: [
      { title: 'checkout', to: { name: 'wizard-examples-checkout' } },
      { title: 'property-listing', to: { name: 'wizard-examples-property-listing' } },
      { title: 'create-deal', to: { name: 'wizard-examples-create-deal' } },
    ],
  },
  {
    title: 'dialog-examples',
    icon: { icon: 'mdi-square-outline' },
    to: 'pages-dialog-examples',
  },
]
