<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDiskStore, File } from 'ducks/disk'
import { SdlIcon, SdlEditDropdown } from 'ui/atoms'
import { color } from 'ui/theme'
import { createSearch } from 'utils/http'
import { useEditDropdown } from 'composes'
import style from './SdlFile.module.scss'

const props = defineProps<{
  file: File
}>()

const router = useRouter()
const diskStore = useDiskStore()

const { wrapperRef, handleContextMenu, dropdownState, handleClose } = useEditDropdown()

const handleClick = () => {
  const route = router.currentRoute.value
  const query = { ...route.query }

  if (query.id === props.file.id) {
    delete query.id
  } else {
    query.id = props.file.id
  }

  router.replace(`${route.path}${createSearch(query)}`)
}
const handleDoubleClick = () =>
  router.push(`/${router.currentRoute.value.params.type}/folder/${props.file.id}`)

const toggleStarred = () => diskStore.toggleStarred(props.file.id)
</script>

<template>
  <div
    ref="wrapperRef"
    :class="style.wrapper"
    @click="handleClick"
    @contextmenu.stop.prevent="handleContextMenu"
    @dblclick="handleDoubleClick"
  >
    <div :class="style.content">
      <SdlIcon
        name="folder"
        width="140"
        height="140"
        :fill="color.gray2"
      />
      <div :class="style.name">
        {{ file.name }}
      </div>
    </div>

    <div
      :class="[style.star, file.starred && style.star__marked]"
      @click.stop="toggleStarred"
    >
      <SdlIcon
        :name="file.starred ? 'star-solid' : 'star'"
        width="28"
        height="28"
        :fill="file.starred ? color.primary2Opacity80 : color.gray2"
      />
    </div>

    <SdlEditDropdown
      v-if="dropdownState.visible"
      :id="file.id"
      :shared="file.shared"
      :top="dropdownState.top"
      :left="dropdownState.left"
      type="folder"
      @close="handleClose"
    />
  </div>
</template>

<style module lang="scss">
</style>
