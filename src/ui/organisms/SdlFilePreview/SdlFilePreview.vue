<script setup lang="ts">
import { ref } from 'vue'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { SdlEmptyPreview } from './components'

const isClosed = ref(false)

const toggleClosed = () => isClosed.value = !isClosed.value
</script>

<template>
  <div :class="$style.spacer" :data-closed="isClosed">
    <div :class="$style.wrapper">
      <SdlEmptyPreview v-if="!isClosed" />
    </div>

    <div :class="$style['toggle-box']" @click="toggleClosed">
      <SdlIcon
        name="double-arrow-right"
        width="24"
        height="24"
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
      right: calc(50px - 33px);

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
  bottom: calc(66px - 33px);
  right: calc(460px - 33px);
  z-index: 3;

  width: 66px;
  height: 66px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border-radius: 12px;
  background: $backgroundGrayDark3;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, .25);
}
</style>
