<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDiskStore } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { useQuery } from 'utils/selectors'
import { SdlEmptyPreview, SdlFilePreview } from './components'

const query = useQuery<{ id?: string }>()
const diskStore = useDiskStore()
const isClosed = ref(false)

const toggleClosed = () => isClosed.value = !isClosed.value

watch(() => query.value.id, id => id && diskStore.fetchPreview(id), {
  immediate: true,
})
</script>

<template>
  <div :class="$style.spacer" :data-closed="isClosed">
    <div :class="$style.wrapper">
      <SdlFilePreview
        v-if="!isClosed && !!diskStore.preview"
        :file="diskStore.preview!"
      />
      <SdlEmptyPreview v-else-if="!isClosed" />
    </div>

    <div :class="$style['toggle-box']" @click="toggleClosed">
      <SdlIcon
        name="double-arrow-right"
        width="16"
        height="16"
        :fill="color.primary2"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.spacer {
  width: 460px;

  &[data-closed='true'] {
    width: 50px;

    .wrapper {
      width: 50px;
      padding: 0;
    }
    .toggle-box {
      right: calc(50px - 22px);

      svg {
        transform: rotate(180deg);
      }
    }
  }

  @include makeMedia(null, 1600px) {
    width: 400px;
  }
}
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 460px;
  padding: 40px 55px 65px;

  display: flex;

  background-color: $backgroundGrayDark;

  @include makeMedia(null, 1600px) {
    padding: 40px 40px 65px;
    width: 400px;
  }
}
.toggle-box {
  position: fixed;
  bottom: calc(66px - 22px);
  right: calc(460px - 22px);
  z-index: 3;

  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border-radius: 12px;
  background: $backgroundGrayDark3;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, .25);

  @include makeMedia(null, 1600px) {
    right: calc(400px - 22px);
  }
}
</style>
