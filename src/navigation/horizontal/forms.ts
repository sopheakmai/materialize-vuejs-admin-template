export default [
  {
    title: 'forms',
    icon: { icon: 'mdi-checkbox-multiple-outline' },
    children: [
      {
        title: 'form-elements',
        icon: { icon: 'mdi-content-copy' },
        children: [
          {
            title: 'autocomplete',
            to: 'forms-autocomplete',
          },
          {
            title: 'checkbox',
            to: 'forms-checkbox',
          },
          {
            title: 'combobox',
            to: 'forms-combobox',
          },
          {
            title: 'date-time-picker',
            to: 'forms-date-time-picker',
          },
          {
            title: 'file-input',
            to: 'forms-file-input',
          },
          {
            title: 'radio',
            to: 'forms-radio',
          },
          {
            title: 'custom-input',
            to: 'forms-custom-input',
          },
          {
            title: 'range-slider',
            to: 'forms-range-slider',
          },
          {
            title: 'rating',
            to: 'forms-rating',
          },
          {
            title: 'select',
            to: 'forms-select',
          },
          { title: 'slider', to: 'forms-slider' },
          {
            title: 'switch',
            to: 'forms-switch',
          },
          {
            title: 'textarea',
            to: 'forms-textarea',
          },
          {
            title: 'textfield',
            to: 'forms-textfield',
          },
        ],
      },
      {
        title: 'form-layouts',
        icon: { icon: 'mdi-checkbox-marked-circle-outline' },
        to: 'forms-form-layouts',
      },
      {
        title: 'form-wizard',
        icon: { icon: 'mdi-align-vertical-distribute' },
        children: [
          { title: 'numbered', to: 'forms-form-wizard-numbered' },
          { title: 'icons', to: 'forms-form-wizard-icons' },
        ],
      },
      {
        title: 'form-validation',
        icon: { icon: 'mdi-checkbox-marked-circle-outline' },
        to: 'forms-form-validation',
      },
    ],
  },
]
