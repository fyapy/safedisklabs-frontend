<script setup lang="ts">
import { computed } from 'vue'
import { useDiskStore } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { bytesToGB } from 'utils/selectors'

const diskStore = useDiskStore()

const disk = computed(() => diskStore.data!)

const style = computed(() => {
  if (diskStore.isEmptyDisk) {
    return undefined
  }

  const _disk = disk.value
  const percent = _disk.maxSize / 100

  return `transform: scaleX(.${_disk.usedSize / percent});`
})
const size = computed(() => {
  if (diskStore.isEmptyDisk || diskStore.pending) {
    return 'Loading...'
  }

  const _disk = disk.value

  return `${bytesToGB(_disk.usedSize).replace('.00', '')} / ${bytesToGB(_disk.maxSize).replace('.00', '')} GB`
})
</script>

<template>
  <div :class="$style.wrapper">
    <sdl-icon
      name="cloud"
      width="20"
      height="20"
      :fill="color.textGray"
    />

    <div :class="$style['progress-wrapper']">
      <div :class="$style['progress']" :style="style"></div>
    </div>

    <div :class="$style.text">
      {{ size }}
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;

  margin: 10px 0 22px;
}
.text {
  font-size: 11px;
  color: $textGray;
}
.progress-wrapper {
  margin: 6px 0;
  width: 44px;
  height: 4px;

  display: flex;

  border-radius: 1px;
  background: rgba(221, 221, 223, .5);
}
.progress {
  flex: 1;

  border-radius: 1px;
  transform-origin: top left;;
  background: $primary2;
  box-shadow: 0px 1px 10px rgba(3, 195, 73, .55);
}
</style>
