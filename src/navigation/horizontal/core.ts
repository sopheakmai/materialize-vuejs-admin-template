export default [
  {
    title: 'Analytics',
    icon: { icon: 'ri-bar-chart-line' },
    to: 'dashboards-analytics',
  },
  {
    title: 'Dashboards',
    icon: { icon: 'ri-home-smile-line' },
    children: [
      {
        title: 'CRM',
        to: 'dashboards-crm',
      },
    ],
    badgeContent: '5',
    badgeClass: 'bg-error',
  },
  {
    title: 'Typography',
    icon: { icon: 'ri-text' },
    to: 'pages-typography',
  },
  {
    title: 'Icons',
    icon: { icon: 'ri-remixicon-line' },
    to: 'pages-icons',
  },
]
