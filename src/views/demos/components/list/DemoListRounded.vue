<script lang="ts" setup>
const items = [
  {
    title: 'Cupcake sesame snaps dessert marzipan.',
    value: 1,
    props: {
      prependIcon: 'ri-dribbble-line',
      rounded: 'pill',
    },
  },
  {
    title: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    value: 2,
    props: {
      prependIcon: 'ri-facebook-circle-line',
      rounded: 'pill',
    },
  },
  {
    title: 'Bonbon macaroon gummies pie jelly',
    value: 3,
    props: {
      prependIcon: 'ri-twitter-line',
      rounded: 'pill',
    },
  },
  {
    title: 'halvah icing marshmallow',
    value: 4,
    props: {
      prependIcon: 'ri-instagram-line',
      rounded: 'pill',
    },
  },
]
</script>

<template>
  <VList :items="items" />
</template>
