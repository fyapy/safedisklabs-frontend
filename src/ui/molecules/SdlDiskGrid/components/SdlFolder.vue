<script setup lang="ts">
import type { Folder } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'

defineProps<{
  folder: Folder
}>()
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <SdlIcon
        name="folder"
        width="140"
        height="140"
        :fill="color.gray2"
      />
      <div :class="$style.name">
        {{ folder.name }}
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: relative;

  padding-top: 100%;

  background-color: $backgroundGrayDark;
  border-radius: 16px;
}
.content {
  position: absolute;
  inset: 0;

  padding: 24px;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  > svg {
    margin-bottom: 18px;
  }
}
.name {
  font-size: 20px;
}
</style>
