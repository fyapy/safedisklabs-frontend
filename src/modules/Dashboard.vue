<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useDiskStore } from 'ducks/disk'
import SdlAppTemplate from 'ui/templates/SdlAppTemplate.vue'

export default defineComponent({
  components: {
    SdlAppTemplate,
  },
  setup() {
    const diskStore = useDiskStore()

    onBeforeMount(diskStore.fetchDiskFiles)
  },
})
</script>

<template>
  <sdl-app-template>
    <div :class="$style.wrapper">Dashboard</div>
  </sdl-app-template>
</template>

<style module lang="scss">
.wrapper {
  padding: 0 120px;
}
</style>
