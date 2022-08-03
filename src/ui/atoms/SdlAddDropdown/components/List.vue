<script setup lang="ts">
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { DropdownStatus } from '../types.js'

const emits = defineEmits<{
  (e: 'status', status: DropdownStatus): void
}>()
</script>

<template>
  <div>
    <div :class="$style.link" @click.stop="emits('status', 'create-folder')">
      <SdlIcon
        name="new-folder"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      Новая папка
    </div>
    <div :class="$style.link">
      <SdlIcon
        name="upload-file"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      Загрузить файл
    </div>
    <div :class="$style.link">
      <SdlIcon
        name="upload-folder"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      Загрузить папку
    </div>
  </div>
</template>

<style module lang="scss">
.link {
  padding: 12px 16px;

  display: flex;

  cursor: pointer;
  transition: color .3s ease;

  &:hover {
    color: $primaryOpacity90;
  }
  &:first-child {
    padding-top: 16px;
  }
  &:last-child {
    padding-bottom: 16px;
  }

  > svg {
    margin-right: 16px;
  }
}
</style>
