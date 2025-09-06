export default [
  {
    title: 'pages',
    icon: { icon: 'mdi-file-outline' },
    children: [
      {
        title: 'menu.user_profile',
        icon: { icon: 'mdi-account-circle-outline' },
        to: { name: 'pages-user-profile-tab', params: { tab: 'profile' } },
      },
      {
        title: 'account-settings',
        icon: { icon: 'mdi-cog-outline' },
        to: { name: 'pages-account-settings-tab', params: { tab: 'account' } },
      },
      { title: 'FAQ', icon: { icon: 'mdi-help-circle-outline' }, to: 'pages-faq' },
      { title: 'help-center', icon: { icon: 'mdi-help-circle-outline' }, to: 'pages-help-center' },
      { title: 'pricing', icon: { icon: 'mdi-currency-usd' }, to: 'pages-pricing' },
      {
        title: 'misc',
        icon: { icon: 'mdi-file-outline' },
        children: [
          { title: 'coming-soon', to: 'pages-misc-coming-soon' },
          { title: 'under-maintenance', to: 'pages-misc-under-maintenance', target: '_blank' },
          { title: 'page-not-found-404', to: 'pages-misc-not-found', target: '_blank' },
          { title: 'not-authorized-401', to: 'pages-misc-not-authorized', target: '_blank' },
          { title: 'server-error-500', to: 'pages-misc-internal-server-error', target: '_blank' },
        ],
      },
      {
        title: 'authentication',
        icon: { icon: 'mdi-lock-outline' },
        children: [
          {
            title: 'menu.login',
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
        title: 'wizard-pages',
        icon: { icon: 'mdi-ray-start-vertex-end' },
        children: [
          { title: 'checkout', to: { name: 'wizard-examples-checkout' } },
          { title: 'property-listing', to: { name: 'wizard-examples-property-listing' } },
          { title: 'create-deal', to: { name: 'wizard-examples-create-deal' } },
        ],
      },
      { title: 'dialog-examples', icon: { icon: 'mdi-content-copy' }, to: 'pages-dialog-examples' },
    ],
  },
]
