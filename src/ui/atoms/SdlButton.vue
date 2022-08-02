<script lang="ts">
import {
  type ButtonHTMLAttributes,
  type PropType,
  defineComponent,
  computed,
} from 'vue'
import { BooleanOptional, NumberOptional } from 'utils/constants'

export default defineComponent({
  props: {
    mt: NumberOptional,
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: undefined,
    },
    disabled: BooleanOptional,
  },
  setup(props) {
    return {
      style: computed(() => `margin-top: ${props.mt}px;`),
    }
  },
})
</script>

<template>
  <button
    :style="style"
    :type="$props.type"
    :class="$style.wrapper"
    :disabled="$props.disabled"
  >
    <slot></slot>
  </button>
</template>

<style module lang="scss">
.wrapper {
  height: 48px;
  width: 100%;
  max-width: 380px;

  color: $white;
  cursor: pointer;
  font-weight: 500;
  border-radius: 12px;
  background-color: $primary;
  transition: opacity .3s;

  &:disabled {
    cursor: default;
    opacity: .2;
  }
}
</style>
