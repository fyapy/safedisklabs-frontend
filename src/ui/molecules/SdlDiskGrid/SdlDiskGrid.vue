<script setup lang="ts">
import type { Breadcrumb } from 'ui/atoms/SdlBreadcrumbs'
import { FilesListType } from 'routes'
import { computed, ref } from 'vue'
import { useDiskStore } from 'ducks/disk'
import { SdlAddDropdown, SdlBreadcrumbs } from 'ui/atoms'
import { useParams } from 'utils/selectors'
import { ContextMenus, useListener } from 'composes'
import { SdlFile, SdlUploadHint, SdlFolder } from './components'

const params = useParams<{ type: FilesListType }>()
const diskStore = useDiskStore()

const dropdownStyle = ref<string>('')
const dropdownRef = ref<{
  wrapperRef: HTMLDivElement
  reset(): void
}>()

const files = computed(() => diskStore.allList)

function handleAddDropdown(e: MouseEvent) {
  ContextMenus.unsubscribeAll()

  const _wrapper = dropdownRef.value?.wrapperRef

  if (_wrapper) {
    const totalWindowHeight = window.scrollY + window.innerHeight
    const top = _wrapper.clientHeight + e.pageY >= totalWindowHeight
      ? totalWindowHeight - _wrapper.clientHeight
      : e.pageY

    dropdownStyle.value = `top: ${top}px; left: ${e.pageX}px;`

    ContextMenus.subscribe(closeAddDropdown)
  }
}

const closeAddDropdown = () => dropdownStyle.value = ''
function handleMissClick(e: MouseEvent) {
  if (!dropdownRef.value?.wrapperRef.contains(e.target as Node)) {
    dropdownRef.value?.reset()
    closeAddDropdown()
  }
}

useListener('click', document, handleMissClick)

const titles: Record<FilesListType, string> = {
  dashboard: 'My Disk',
  bin: 'Bin',
  hidden: 'Hidden files',
  starred: 'Starred files',
}

const breadcrumbsList = computed((): Breadcrumb[] => (diskStore.paths.length
  ? [
    {
      to: `/${params.value.type}`,
      text: 'My Disk',
    },
    ...diskStore.paths.map(({ id, name }) => ({
      to: `/${params.value.type}/folder/${id}`,
      text: name,
    })),
  ]
  : []))
</script>

<template>
  <div class="flex-1" @contextmenu.prevent="handleAddDropdown">
    <div :class="$style.header">
      <div>{{ titles[params.type] }}</div>

      <SdlBreadcrumbs :list="breadcrumbsList" :class="$style.breadcrumbs" />
    </div>

    <div v-if="!files.length" :class="$style.grid">
      <SdlUploadHint />
    </div>

    <div v-else :class="$style.grid">
      <div v-for="file in files" :key="file.id">
        <SdlFolder v-if="file.type === 'folder'" :file="file" />
        <SdlFile v-else :file="file" />
      </div>
    </div>
  </div>

  <SdlAddDropdown ref="dropdownRef" :style="dropdownStyle" @close="closeAddDropdown" />
</template>

<style module lang="scss">
.header {
  margin-bottom: 40px;

  display: flex;

  font-size: 28px;
  font-weight: 600;
}
.breadcrumbs {
  margin-left: 28px;
}
.grid {
  margin-bottom: 40px;
  width: 100%;

  display: grid;
  row-gap: 32px;
  column-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
}
</style>
