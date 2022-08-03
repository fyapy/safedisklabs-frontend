<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useDiskStore } from 'ducks/disk'
import SdlAppTemplate from 'ui/templates/SdlAppTemplate.vue'
import SdlDashboardTemplate from 'ui/templates/SdlDashboardTemplate.vue'

const diskStore = useDiskStore()

onBeforeMount(diskStore.fetchDiskFiles)
</script>

<template>
  <sdl-app-template>
    <sdl-dashboard-template />
  </sdl-app-template>
</template>
