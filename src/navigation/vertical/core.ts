export default [
  {
    title: 'Analytics',
    icon: { icon: 'ri-bar-chart-line' },
    to: 'dashboards-analytics',
  },
  { heading: 'Apps & Pages' },
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
  { heading: 'UI Elements' },
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
  {
    title: 'form',
    icon: { icon: 'ri-remixicon-line' },
    to: 'form',
  },
]
