<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { File, useDiskStore } from 'ducks/disk'
import { SdlIcon, SdlEditDropdown } from 'ui/atoms'
import { color } from 'ui/theme'
import { createSearch } from 'utils/http'
import { bytesToMB, mimeTypeToIcon } from 'utils/selectors'
import { useEditDropdown } from 'composes'
import style from './SdlFile.module.scss'

const props = defineProps<{
  file: File
}>()

const router = useRouter()
const diskStore = useDiskStore()

const { wrapperRef, handleContextMenu, dropdownState, handleClose } = useEditDropdown()

const fileIcon = computed(() => mimeTypeToIcon(props.file.meta?.mime))
const size = computed(() => props.file.meta
  ? `${bytesToMB(+props.file.meta!.size).toFixed(3)} MB`
  : null)

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

const toggleStarred = () => diskStore.toggleStarred(props.file.id)
</script>

<template>
  <div
    ref="wrapperRef"
    :class="style.wrapper"
    @click="handleClick"
    @contextmenu.stop.prevent="handleContextMenu"
  >
    <div :class="style.content">
      <div class="flex-1"></div>

      <div :class="$style.file">
        <SdlIcon
          name="blank-file"
          width="110"
          height="110"
          :fill="color.gray2"
        />
        <SdlIcon
          v-if="fileIcon"
          data-icon="image"
          :name="fileIcon"
          width="48"
          height="48"
          :fill="color.gray3"
        />
      </div>

      <div :class="style.name">
        {{ file.name }}
      </div>

      <div class="flex-1"></div>

      <div :class="$style.line"></div>

      <div :class="$style.data">
        <div class="flow-column">
          <div>Filesize:</div>
          <div :class="$style.filesize">{{ size }}</div>
        </div>

        <div :class="style.icons">
          <SdlIcon
            v-if="file.shared"
            name="share"
            width="24"
            height="24"
            :fill="color.primary2Opacity80"
          />
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
        type="file"
        @close="handleClose"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.file {
  position: relative;

  margin-bottom: 14px;

  > [data-icon='image'] {
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);
  }
}
.line {
  width: 100%;
  height: 1px;
  margin: 16px 0 12px;

  background-color: $gray2Opacity40;
}
.data {
  width: 100%;

  display: flex;
  justify-content: space-between;
}
.filesize {
  margin-top: 2px;

  color: $gray4;
}
</style>
