<script setup lang="ts">
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import style from './SdlPreview.module.scss'
</script>

<template>
  <div :class="style.wrapper">
    <div :class="style.header">
      <SdlIcon
        name="file"
        width="28"
        height="28"
        :fill="color.gray2"
      />
      File Preview
    </div>

    <div :class="style.content">
      <SdlIcon
        name="file"
        width="140"
        height="140"
        :fill="color.gray2"
      />
      <div :class="style.content__title">No File Selected</div>
      <!-- eslint-disable-next-line max-len -->
      <div>When you’ll select one of the files, you’ll be able {{ '\n' }}to see all the details and managing options</div>
    </div>

    <div :class="style.line"></div>
  </div>
</template>
