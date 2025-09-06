export default [
  {
    title: 'apps',
    icon: { icon: 'mdi-package-variant' },
    children: [
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
        to: 'apps-calendar',
        icon: { icon: 'mdi-calendar-blank' },
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
          { title: 'list-0', to: 'apps-user-list' },
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
    ],
  },
]
