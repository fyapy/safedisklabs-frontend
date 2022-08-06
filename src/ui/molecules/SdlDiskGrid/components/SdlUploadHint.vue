<script setup lang="ts">
import { computed } from 'vue'
import { useDiskStore } from 'ducks/disk/store'
import { SdlIcon, SdlButton } from 'ui/atoms'
import { color } from 'ui/theme'
import { useParams } from 'utils/selectors'

const params = useParams<{ id?: string }>()
const diskStore = useDiskStore()

const isLoading = computed(() => diskStore.inPendingList('upload'))

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files

  if (files === null) {
    return
  }

  diskStore.upload(files, params.value.id)
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <SdlIcon
        name="file"
        width="100"
        height="100"
        :fill="color.gray2"
      />
      <label class="justify-center">
        <SdlButton
          tag="div"
          size="sm"
          theme="dark"
        >
          Upload file(s)
        </SdlButton>
        <input
          type="file"
          multiple
          @change="handleChange"
          :disabled="isLoading"
        >
      </label>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: relative;

  padding-top: 100%;

  border: 2px dashed $grayLight2;
  border-radius: 16px;
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
    margin-bottom: 32px;
  }
  > label {
    width: 100%;
    height: 40px;

    input {
      width: 1px;
      height: 1px;

      visibility: none;
    }
  }
}
</style>
