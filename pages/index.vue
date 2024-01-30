<template>
  <div>
    <h3>Icons Universal</h3>
    <Iconify name="logos:vue" />
    <Iconify name="logos:nuxt" />
    <Iconify :name="icon1" />
    <Iconify :name="icon2" />
    <Iconify :name="icon3" />
    <h3>Icons Server</h3>
    <ServerComp />
  </div>
</template>

<script setup>
const icon1 = 'ph:airplane-tilt'
const icon2 = 'material-symbols:360-rounded'
const icon3 = 'solar:4k-outline'
</script>
