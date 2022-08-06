<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Folder, useDiskStore } from 'ducks/disk'
import { SdlIcon, SdlEditDropdown } from 'ui/atoms'
import { color } from 'ui/theme'
import { createSearch } from 'utils/http'
import { useEditDropdown } from 'composes'
import style from './SdlFile.module.scss'

const props = defineProps<{
  folder: Folder
}>()

const router = useRouter()
const diskStore = useDiskStore()

const { wrapperRef, handleContextMenu, dropdownState, handleClose } = useEditDropdown()

const handleClick = () => {
  const route = router.currentRoute.value
  const query = { ...route.query }

  if (query.id === props.folder.id) {
    delete query.id
  } else {
    query.id = props.folder.id
  }

  router.replace(`${route.path}${createSearch(query)}`)
}
</script>

<template>
  <div
    ref="wrapperRef"
    :class="style.wrapper"
    @click="handleClick"
    @contextmenu.stop.prevent="handleContextMenu"
  >
    <div :class="style.content">
      <SdlIcon
        name="folder"
        width="140"
        height="140"
        :fill="color.gray2"
      />
      <div :class="style.name">
        {{ folder.name }}
      </div>
    </div>

    <div
      :class="[style.star, folder.starred && style.star__marked]"
      @click="diskStore.toggleStarred(folder.id, 'folder')"
    >
      <SdlIcon
        :name="folder.starred ? 'star-solid' : 'star'"
        width="28"
        height="28"
        :fill="folder.starred ? color.primary2Opacity80 : color.gray2"
      />
    </div>

    <SdlEditDropdown
      v-if="dropdownState.visible"
      :id="folder.id"
      :shared="folder.shared"
      :top="dropdownState.top"
      :left="dropdownState.left"
      type="folder"
      @close="handleClose"
    />
  </div>
</template>

<style module lang="scss">
</style>
