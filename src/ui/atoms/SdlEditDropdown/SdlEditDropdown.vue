<script setup lang="ts">
import type { FType } from 'ducks/disk'
import { computed } from 'vue'
import { List } from './components'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps<{
  id: string
  top: number
  left: number
  shared: boolean
  type: FType
}>()

const style = computed(() => `top: ${props.top}px; left: ${props.left}px;`)
</script>

<template>
  <div :class="$style.wrapper" :style="style">
    <List
      :id="id"
      :type="type"
      :shared="shared"
      @close="emit('close')"
    />
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: fixed;
  z-index: 90;

  user-select: none;
  border-radius: 12px;
  background-color: $backgroundGrayDark3;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, .25);
}
</style>
