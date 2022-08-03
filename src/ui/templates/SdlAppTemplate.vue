<script lang="ts">
import { defineComponent } from 'vue'
import { SdlNavbar } from 'ui/organisms/SdlNavbar'

export default defineComponent({
  components: {
    SdlNavbar,
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <sdl-navbar />
    <slot></slot>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
}
</style>
