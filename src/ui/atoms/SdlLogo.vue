<script lang="ts">
import { defineComponent } from 'vue'
import { StringOptional } from 'utils/constants'

export default defineComponent({
  props: {
    class: StringOptional,
    width: {
      type: Number,
      required: true,
      default: 56,
    },
    height: {
      type: Number,
      required: true,
      default: 56,
    },
  },
})
</script>

<template>
  <router-link to="/" :class="$props.class">
    <svg
      :height="height"
      :width="width"
      xmlns="http://www.w3.org/2000/svg"
      fill="#1FF5BA"
      fill-opacity=".8"
      viewBox="0 0 56 56"
    >
      <!-- eslint-disable-next-line max-len -->
      <path d="M54.4 3.3H23l1.4 3.3H56V4.9c0-.9-.7-1.6-1.6-1.6Zm-7.7 30.6a23 23 0 0 0-17.7 0c-.6.2-1 .8-1 1.5V41c0 6.3 3.5 12 9.1 14.8.5.3 1 .3 1.5 0 5.5-2.8 9-8.5 9-14.8v-5.6c0-.7-.3-1.3-1-1.5Zm-4.2 9-4.7 4.7c-.6.7-1.6.7-2.3 0l-2.3-2.3a1.6 1.6 0 0 1 2.3-2.3l1.2 1.1 3.5-3.4a1.6 1.6 0 0 1 2.3 2.3Z" />
      <!-- eslint-disable-next-line max-len -->
      <path d="M18.5 1c-.3-.6-.9-1-1.5-1H1.6C.7 0 0 .7 0 1.6v37.2a5 5 0 0 0 5 5h20l-.3-2.8v-5.6a5 5 0 0 1 3.1-4.6 27 27 0 0 1 20 0 5 5 0 0 1 3.2 4.6V41c0 1 0 1.9-.2 2.8h.3a5 5 0 0 0 4.9-5v-29H22.4l-4-8.8Zm.8 36.2h-11a1.6 1.6 0 0 1 0-3.3h11a1.6 1.6 0 0 1 0 3.3Zm0-6.6h-11a1.6 1.6 0 0 1 0-3.3h11a1.6 1.6 0 1 1 0 3.3Z" />
    </svg>
  </router-link>
</template>
