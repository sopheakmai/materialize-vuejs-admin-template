export default [
  {
    title: 'analytics',
    icon: { icon: 'solar-chart-square-outline' },
    to: 'dashboards-analytics',
  },
  { heading: 'apps.and.pages' },
  {
    title: 'dashboards',
    icon: { icon: 'solar-home-angle-outline' },
    children: [
      {
        title: 'CRM',
        to: 'dashboards-crm',
      },
      {
        title: 'eCommerce',
        to: 'dashboards-ecommerce',
      },
    ],
    badgeContent: '5',
    badgeClass: 'bg-error',
  },
  { heading: 'ui.elements' },
  {
    title: 'typography',
    icon: { icon: 'solar-document-text-outline' },
    to: 'core-typography',
  },
  {
    title: 'icons',
    icon: { icon: 'solar-cosmetic-outline' },
    to: 'core-icons',
  },
  {
    title: 'form',
    icon: { icon: 'solar-pen-new-square-outline' },
    to: 'core-form',
  },
  {
    title: 'table',
    icon: { icon: 'solar-database-outline' },
    to: 'core-table',
  },
]
