<script setup lang="ts">
import { SdlFilesFilter, SdlDiskGrid } from 'ui/molecules'
import { SdlFilePreview } from 'ui/organisms'
</script>

<template>
  <div :class="$style.wrapper" @contextmenu.prevent>
    <SdlFilesFilter />
    <SdlDiskGrid />
  </div>
  <SdlFilePreview />
</template>

<style module lang="scss">
.wrapper {
  padding: 0 120px;
  min-height: 100vh;

  flex: 1;
  display: flex;
  flex-flow: column;
}
</style>
