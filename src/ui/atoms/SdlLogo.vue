<script lang="ts">
import { defineComponent } from 'vue'
import { NumberRequired, StringOptional } from '../../utils/constants'

export default defineComponent({
  props: {
    class: StringOptional,
    width: NumberRequired,
    height: NumberRequired,
  },
})
</script>

<template>
  <svg
    :class="$props.class"
    :height="$props.height"
    :width="$props.width"
    fill="#1FF5BA"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- eslint-disable-next-line  -->
    <path d="M54.36 3.281H23.067l1.459 3.281H56v-1.64a1.64 1.64 0 0 0-1.64-1.64ZM46.654 33.866c-5.873-2.337-11.747-2.337-17.62 0A1.641 1.641 0 0 0 28 35.39v5.638c0 6.275 3.54 11.986 9.1 14.794.468.236 1.02.236 1.488 0 5.56-2.809 9.1-8.52 9.1-14.794V35.39c0-.672-.41-1.277-1.034-1.525Zm-4.17 9.118-4.64 4.64c-.641.642-1.68.642-2.32 0l-2.32-2.32a1.64 1.64 0 0 1 2.32-2.32l1.16 1.16 3.48-3.48a1.64 1.64 0 0 1 2.32 2.32Z" />
    <!-- eslint-disable-next-line max-len -->
    <path d="M18.452.974A1.64 1.64 0 0 0 16.953 0H1.641A1.64 1.64 0 0 0 0 1.64v37.188a4.922 4.922 0 0 0 4.922 4.922h19.984a19.883 19.883 0 0 1-.187-2.721V35.39a4.897 4.897 0 0 1 3.102-4.574c3.31-1.317 6.683-1.985 10.023-1.985s6.712.668 10.023 1.985a4.898 4.898 0 0 1 3.102 4.574v5.638c0 .914-.063 1.823-.188 2.721h.297A4.922 4.922 0 0 0 56 38.828V9.844H22.394L18.452.974Zm.798 36.214H8.312a1.64 1.64 0 0 1 0-3.282H19.25a1.64 1.64 0 0 1 0 3.282Zm0-6.563H8.312a1.64 1.64 0 0 1 0-3.281H19.25a1.64 1.64 0 1 1 0 3.281Z" />
  </svg>
</template>
