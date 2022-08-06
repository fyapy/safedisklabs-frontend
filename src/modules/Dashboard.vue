<script setup lang="ts">
import { FilesListType } from 'routes'
import { onBeforeMount, onUpdated } from 'vue'
import { useDiskStore } from 'ducks/disk'
import SdlAppTemplate from 'ui/templates/SdlAppTemplate.vue'
import SdlDashboardTemplate from 'ui/templates/SdlDashboardTemplate.vue'
import { useParams } from 'utils/selectors'

const params = useParams<{ type: FilesListType }>()
const diskStore = useDiskStore()

onBeforeMount(() => {
  diskStore.fetchDiskFiles(params.value.type)
})
onUpdated(() => {
  diskStore.fetchDiskFiles(params.value.type)
})
</script>

<template>
  <sdl-app-template>
    <sdl-dashboard-template />
  </sdl-app-template>
</template>
