export default [
  {
    title: 'dashboards',
    icon: { icon: 'mdi-home-outline' },
    children: [
      {
        title: 'CRM',
        to: 'dashboards-crm',
        icon: { icon: 'mdi-monitor-dashboard' },
        action: 'read',
        subject: 'auth',
      },
      {
        title: 'analytics',
        to: 'dashboards-analytics',
        icon: { icon: 'mdi-chart-timeline-variant' },
      },
      {
        title: 'eCommerce',
        to: 'dashboards-ecommerce',
        icon: { icon: 'mdi-cart-outline' },
        action: 'read',
        subject: 'admin',
      },
    ],
  },
]
