<script setup lang="ts">
import { computed } from 'vue'
import { useDiskStore } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { useParams } from 'utils/selectors'
import { DropdownStatus } from '../types'

const emits = defineEmits<{
  (e: 'status', status: DropdownStatus): void
  (e: 'close'): void
}>()

const params = useParams<{ id?: string }>()
const diskStore = useDiskStore()

const isLoading = computed(() => diskStore.inPendingList('upload'))

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files

  emits('close')
  diskStore.upload(files, params.value.id)
}
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
      Create folder
    </div>
    <div :class="$style.link">
      <label class="align-center">
        <SdlIcon
          name="upload-file"
          width="21"
          height="21"
          :fill="color.textGray"
        />
        Upload file
        <input
          type="file"
          multiple
          @change="handleChange"
          :disabled="isLoading"
        >
      </label>
    </div>
    <div :class="$style.link">
      <label class="align-center">
        <SdlIcon
          name="upload-folder"
          width="21"
          height="21"
          :fill="color.textGray"
        />
        Upload folder
        <input
          type="file"
          multiple
          directory
          webkitdirectory
          @change="handleChange"
          :disabled="isLoading"
        >
      </label>
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

  svg {
    margin-right: 16px;
  }
  input {
    width: 1px;
    height: 1px;

    visibility: none;
  }
}
</style>
