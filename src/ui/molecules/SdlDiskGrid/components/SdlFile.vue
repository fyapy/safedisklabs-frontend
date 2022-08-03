<script setup lang="ts">
import type { File } from 'ducks/disk'

defineProps<{
  file: File
}>()
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <div :class="$style.name">
        {{ file.name }}
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: relative;

  padding-top: 100%;

  background-color: $backgroundGrayDark;
  border: 1px solid $backgroundGrayDark;
  border-radius: 16px;
  transition:
    border-color .3s ease,
    background-color .3s ease;

  &:hover {
    border-color: $grayLight2;
    background-color: $grayLight;
  }
}
.content {
  position: absolute;
  inset: 0;

  padding: 24px;
}
.name {
  font-size: 20px;
  overflow-wrap: anywhere;
}
</style>
