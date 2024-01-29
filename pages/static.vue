<template>
  <div>
    <h3>Icons</h3>
    <Iconify name="heroicons:arrow-down-left-16-solid" />
    <Iconify name="iconamoon:arrow-right-6-circle-duotone" />
    <Iconify :name="icon1" />
    <Iconify :name="icon2" />
    <Iconify :name="icon3" />
  </div>
</template>

<script setup>
const icon1 = "majesticons:bookmark-plus-line"
const icon2 = 'majesticons:airplane-line'
const icon3 = `flowbite:adjustments-vertical-outline`
</script>