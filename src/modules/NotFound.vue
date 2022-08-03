<script setup lang="ts">
import SdlAppTemplate from 'ui/templates/SdlAppTemplate.vue'
</script>

<template>
  <sdl-app-template>
    <div :class="$style.wrapper">404</div>
  </sdl-app-template>
</template>

<style module lang="scss">
.wrapper {
  padding: 0 120px;

  @include makeMedia(null, 1600px) {
    padding: 0 80px;
  }
}
</style>
