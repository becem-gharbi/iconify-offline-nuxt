<template>
  <div>
    <Iconify :name="icon" />
    <button @click="swap">
      swap
    </button>
  </div>
</template>

<script setup>
const icon1 = 'carbon:bat'
const icon2 = 'carbon:bare-metal-server'
const icon = ref(icon1)
const swap = () => {
  icon.value = icon.value === icon1 ? icon2 : icon1
}
</script>
