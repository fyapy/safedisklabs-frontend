<script setup lang="ts">
import { FilesListType } from 'routes'
import { onBeforeMount, watch } from 'vue'
import { useDiskStore } from 'ducks/disk'
import SdlAppTemplate from 'ui/templates/SdlAppTemplate.vue'
import SdlDashboardTemplate from 'ui/templates/SdlDashboardTemplate.vue'
import { useParams } from 'utils/selectors'

const params = useParams<{ type: FilesListType, id: string }>()
const diskStore = useDiskStore()

onBeforeMount(() => diskStore.fetchDiskFiles(params.value.type, params.value.id))
watch(
  [() => params.value.id, () => params.value.type],
  ([id, type]) => diskStore.fetchDiskFiles(type, id),
)
</script>

<template>
  <sdl-app-template>
    <sdl-dashboard-template />
  </sdl-app-template>
</template>
