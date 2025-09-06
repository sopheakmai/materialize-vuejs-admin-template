export default [
  { heading: 'ui.elements' },
  {
    title: 'typography',
    icon: { icon: 'mdi-alpha-t-box-outline' },
    to: 'pages-typography',
  },
  {
    title: 'icons',
    icon: { icon: 'mdi-eye-outline' },
    to: 'pages-icons',
  },
  {
    title: 'cards',
    icon: { icon: 'mdi-credit-card-outline' },
    children: [
      { title: 'basic', to: 'pages-cards-card-basic' },
      { title: 'advance', to: 'pages-cards-card-advance' },
      { title: 'statistics', to: 'pages-cards-card-statistics' },
      { title: 'widgets', to: 'pages-cards-card-widgets' },
      { title: 'gamification', to: 'pages-cards-card-gamification' },
      { title: 'actions', to: 'pages-cards-card-actions' },
    ],
  },
  {
    title: 'components',
    icon: { icon: 'mdi-archive-outline' },
    children: [
      { title: 'alert', to: 'components-alert' },
      { title: 'avatar', to: 'components-avatar' },
      { title: 'badge', to: 'components-badge' },
      { title: 'button', to: 'components-button' },
      { title: 'chip', to: 'components-chip' },
      { title: 'dialog', to: 'components-dialog' },
      { title: 'expansion-panel', to: 'components-expansion-panel' },
      { title: 'list-0', to: 'components-list' },
      { title: 'menu', to: 'components-menu' },
      { title: 'pagination', to: 'components-pagination' },
      { title: 'progress-circular', to: 'components-progress-circular' },
      { title: 'progress-linear', to: 'components-progress-linear' },
      { title: 'snackbar', to: 'components-snackbar' },
      { title: 'tabs', to: 'components-tabs' },
      { title: 'timeline', to: 'components-timeline' },
      { title: 'tooltip', to: 'components-tooltip' },
    ],
  },
  {
    title: 'extensions',
    icon: { icon: 'mdi-cube-outline' },
    children: [
      { title: 'tour', to: 'extensions-tour' },
    ],
  },
]
