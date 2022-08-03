<script lang="ts">
import { defineComponent, computed } from 'vue'
import { btnProps, computeClasses } from './props'

export default defineComponent({
  props: btnProps,
  setup(props) {
    return {
      classes: computed(() => computeClasses({
        size: props.size,
        disabled: props.disabled,
        class: props.class,
        theme: props.theme,
      })),
      style: computed(() => props.mt ? `margin-top: ${props.mt}px;` : undefined),
    }
  },
})
</script>

<template>
  <Component
    :is="tag"
    :style="style"
    :type="type"
    :class="classes"
    :disabled="disabled"
  >
    <slot></slot>
  </Component>
</template>
