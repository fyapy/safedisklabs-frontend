<script setup lang="ts">
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
</script>

<template>
  <div :class="$style.wrapper">
    <div class="justify-between">
      <div :class="$style.title">SafeDiskLabs</div>

      <div class="d-flex align-center">
        <div :class="$style.btn">
          <SdlIcon
            name="filter"
            width="24"
            height="24"
            :fill="color.gray2"
          />
        </div>
        <div :class="$style.btn" data-box="true">
          <SdlIcon
            name="box-plus"
            width="24"
            height="24"
            :fill="color.gray2"
            :stroke="color.gray2"
          />
        </div>
        <div :class="$style.btn">
          <SdlIcon
            name="search"
            width="24"
            height="24"
            :fill="color.gray2"
          />
        </div>
      </div>
    </div>
    <div :class="$style.line"></div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  margin: 40px 0 32px;
}
.title {
  font-weight: 600;
  font-size: 28px;

  color: rgba(255, 255, 255, .35);
}
.btn {
  margin-left: 30px;

  cursor: pointer;

  &[data-box="true"]:hover svg > use {
    stroke: $primaryOpacity90;
  }
  &:hover svg > use {
    fill: $primaryOpacity90;
  }

  svg > use {
    transition:
      stroke .3s ease,
      fill .3s ease;
  }
}
.line {
  margin-top: 28px;
  height: 1px;

  background-color: rgba(107, 107, 111, 0.4);
}
</style>
