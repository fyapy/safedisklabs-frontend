<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { NotificationType } from 'ducks/notifications'
import { NumberRequired, StringRequired } from 'utils/constants'

export default defineComponent({
  props: {
    text: StringRequired,
    timeout: NumberRequired,
    type: {
      type: String as PropType<NotificationType>,
      required: true,
    },
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    return {
      style: computed(() => `animation: notifyTransform ${props.timeout}ms;`),
    }
  },
})
</script>

<template>
  <div
    :class="[
      $style.wrapper,
      type === 'error' && $style['is-error'],
    ]"
  >
    <div>{{ text }}</div>
    <div :class="$style['progress-background']">
      <div
        :class="$style.progress"
        :style="style"
      ></div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: relative;

  width: 350px;
  padding: 14.5px 20px 24.5px 16px;

  white-space: pre-line;
  border-radius: 12px;
  border: 1px solid $backgroundGrayDark3;
  background: $backgroundGrayDark3;
  box-shadow: 0px 4px 32px $blackOpacity25;

  &:not(:first-child) {
    margin-top: 20px;
  }
}
.is-error {
  padding-left: 20px;

  background: $redDarken;
  border: 1px solid $textDanger;
  box-shadow: 0px 4px 32px $redDarkenOpacity25;
}
.progress {
  width: 100%;

  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 1px 10px rgba(255, 255, 255, 0.35);
  border-radius: 1px;

  transform-origin: left top;
}
.progress-background {
  position: absolute;
  bottom: 10px;
  right: 20px;
  left: 20px;

  display: flex;

  height: 4px;

  border-radius: 1px;
  background: $grayOpacity50;
}
</style>
