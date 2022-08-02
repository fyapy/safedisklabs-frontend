<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'

export default defineComponent({
  props,
})
</script>

<template>
  <svg
    data-name="icon"
    :class="$props.class"
    :width="$props.width"
    :height="$props.height"
    @click="$props.click"
  >
    <use
      :xlink:href="`#${$props.name}`"
      :fill="$props.fill"
      :stroke="$props.stroke"
      :strokeWidth="$props.strokeWidth"
      :transform="$props.transform"
    />
  </svg>
</template>
