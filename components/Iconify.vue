<template>
  <Icon :icon="icon" :width="24" :height="24" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/offline";
import { loadIcon } from "@iconify/vue";

const props = defineProps<{ name: string }>();

const sName = computed(() => props.name)
const icon = ref();

const load = (name: string) => loadIcon(name).catch(() => console.error(`Failed to load icon ${name}`));

icon.value = await load(sName.value);

watch(sName, (value) => load(value).then((res) => (icon.value = res)));
</script>