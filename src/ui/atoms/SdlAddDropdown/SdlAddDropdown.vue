<script setup lang="ts">
import { ref } from 'vue'
import { CreateFolder } from 'forms/CreateFolder'
import { List } from './components'
import { DropdownStatus } from './types'

const emits = defineEmits<{
  (e: 'close'): void
}>()
defineProps<{
  style: string
}>()

const wrapperRef = ref<HTMLDivElement>()
const status = ref<DropdownStatus>('list')

function submitCreateFolder() {
  emits('close')
  status.value = 'list'
}

function reset() {
  status.value = 'list'
}

defineExpose({
  wrapperRef,
  reset,
})
</script>

<template>
  <div
    ref="wrapperRef"
    :class="[$style.wrapper, !style && $style.hidden]"
    :style="style"
  >
    <List
      v-if="status === 'list'"
      @status="e => status = e"
      @close="emits('close')"
    />
    <CreateFolder
      v-else-if="status === 'create-folder'"
      @submit="submitCreateFolder"
    />
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: absolute;
  z-index: 90;

  user-select: none;
  border-radius: 12px;
  background-color: $backgroundGrayDark3;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, .25);
}
.hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
