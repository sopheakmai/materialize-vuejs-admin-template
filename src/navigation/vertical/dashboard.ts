export default [
  {
    title: 'dashboards',
    icon: { icon: 'mdi-home-outline' },
    children: [
      {
        title: 'CRM',
        to: 'dashboards-crm',
      },
      {
        title: 'analytics',
        to: 'dashboards-analytics',
      },
      {
        title: 'eCommerce',
        to: 'dashboards-ecommerce',
      },
    ],
    badgeContent: 'new',
    badgeClass: 'bg-error',
  },
]
