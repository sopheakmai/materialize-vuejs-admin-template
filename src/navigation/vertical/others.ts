export default [
  { heading: 'others' },
  {
    title: 'access-control',
    icon: { icon: 'mdi-shield-outline' },
    to: 'access-control',
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'nav-levels',
    icon: { icon: 'mdi-menu' },
    children: [
      {
        title: 'level-2-1',
        to: null,
      },
      {
        title: 'level-2-2',
        children: [
          {
            title: 'level-3-1',
            to: null,
          },
          {
            title: 'level-3-2',
            to: null,
          },
        ],
      },
    ],
  },
  {
    title: 'disabled-menu',
    to: null,
    icon: { icon: 'mdi-eye-off-outline' },
    disable: true,
  },
  {
    title: 'raise-support',
    href: 'https://pixinvent.ticksy.com/',
    icon: { icon: 'mdi-lifebuoy' },
    target: '_blank',
  },
  {
    title: 'documentation',
    href: 'https://pixinvent.com/demo/materialize-vuejs-admin-template/documentation/',
    icon: { icon: 'mdi-file-document-outline' },
    target: '_blank',
  },
]
