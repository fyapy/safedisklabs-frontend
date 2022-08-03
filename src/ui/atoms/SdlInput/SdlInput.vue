<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'

export default defineComponent({
  emits: ['update:modelValue', 'blur'],
  props,
  setup(_, { emit }) {
    const handleInput = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)

    return {
      handleInput,
    }
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <input
      :placeholder="placeholder"
      :class="$style.input"
      :type="type"
      @blur="$emit('blur')"
      :value="modelValue"
      @input="handleInput"
      :data-theme="theme"
    >
    <div v-if="error" :class="$style.error">
      {{ error }}
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  margin-bottom: 12px;
  width: 100%;

  display: flex;
  flex-flow: column;
}
.input {
  height: 48px;
  width: 100%;
  max-width: 380px;
  padding: 0 16px;

  border-radius: 12px;
  color: $white;
  background-color: $backgroundGrayDark;
  border: none;

  &::placeholder {
    color: $whiteOpacity80;
  }
  &:focus {
    outline: none;
  }
  &[data-theme='bordered'] {
    border: 1px solid rgba(107, 107, 111, .4);
  }
}
.error {
  margin: 6px 0 0 12px;

  color: $textDanger;
  font-size: 14px;
}
</style>
