<script setup lang="ts">
import { Folder, useDiskStore } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'

const diskStore = useDiskStore()

const props = defineProps<{
  folder: Folder
}>()

const toggleStarred = () => diskStore.toggleStarred(props.folder.id, 'folder')
</script>

<template>
  <div :class="$style.wrapper">
    <div
      :class="[$style.star, folder.starred && $style.starred]"
      @click="toggleStarred"
    >
      <SdlIcon
        :name="folder.starred ? 'star-solid' : 'star'"
        width="28"
        height="28"
        :fill="folder.starred ? color.primary2Opacity80 : color.gray2"
      />
    </div>

    <div :class="$style.content">
      <SdlIcon
        name="folder"
        width="140"
        height="140"
        :fill="color.gray2"
      />
      <div :class="$style.name">
        {{ folder.name }}
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: relative;

  padding-top: 100%;

  background-color: $backgroundGrayDark;
  border: 1px solid $backgroundGrayDark;
  border-radius: 16px;
  user-select: none;
  transition:
    border-color .3s ease,
    background-color .3s ease;

  &:hover {
    border-color: $grayLight2;
    background-color: $grayLight;
  }
}
.content {
  position: absolute;
  inset: 0;

  padding: 24px;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  > svg {
    margin-bottom: 18px;
  }
}
.name {
  font-size: 20px;
}
.star {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;

  padding: 10px;

  display: flex;

  cursor: pointer;
  user-select: none;
}
.starred {
  filter: drop-shadow(0px 4px 16px rgba(3, 195, 73, .45));
}
</style>
