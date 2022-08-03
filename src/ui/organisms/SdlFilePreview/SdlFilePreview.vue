<script setup lang="ts">
import { SdlEmptyPreview } from './components'
</script>

<template>
  <div :class="$style.spacer">
    <div :class="$style.wrapper">
      <SdlEmptyPreview />
    </div>
  </div>
</template>

<style module lang="scss">
.spacer {
  width: 460px;
}
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 460px;
  padding: 40px 55px 65px;

  display: flex;

  background-color: $backgroundGrayDark;
}
</style>
