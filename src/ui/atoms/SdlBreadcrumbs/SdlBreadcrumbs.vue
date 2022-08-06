<script setup lang="ts">
import type { Breadcrumb } from './types'
import { color } from 'ui/theme'
import { SdlIcon } from '../SdlIcon'

defineProps<{
  class?: string
  list: Breadcrumb[]
}>()
</script>

<template>
  <div :class="[$style.wrapper, $props.class]">
    <div v-for="({ text, to }, index) in list" :key="to" :class="$style.link">
      <router-link :to="to">
        {{ text }}
      </router-link>

      <SdlIcon
        v-if="index !== list.length - 1"
        name="arrow-right"
        width="12"
        height="12"
        :fill="color.whiteOpacity60"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
}
.link {
  display: flex;
  align-items: center;

  > svg {
    margin-left: 8px;
  }
  > a {
    height: 36.4px;
    padding: 0 12px;

    display: flex;
    align-items: center;

    font-size: 13px;
    font-weight: 600;
    border-radius: 12px;
    border: 1px solid $backgroundGrayDark3;
    background-color: $backgroundGrayDark3;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, .25);
    transition: border-color .3s ease;

    &:hover {
      border-color: $primary2Opacity80;
    }
    &:global(.router-link-active) {
      border-color: $primary2;
    }

  }

  &:not(:last-child) {
    margin-right: 8px;
  }
}
</style>
