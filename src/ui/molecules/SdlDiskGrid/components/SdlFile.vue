<script setup lang="ts">
import type { File } from 'ducks/disk'

defineProps<{
  file: File
}>()
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.name">
      {{ file.name }}
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 24px;

  background-color: $backgroundGrayDark;
  border-radius: 16px;
}
.name {
  font-size: 20px;
}
</style>
