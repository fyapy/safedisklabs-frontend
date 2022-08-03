<script lang="ts">
import { useField } from 'formis'
import { defineComponent } from 'vue'
import { SdlInput, props } from 'ui/atoms/SdlInput'
import { StringRequired } from 'utils/constants'

export default defineComponent({
  components: {
    SdlInput,
  },
  props: {
    ...props,
    name: StringRequired,
  },
  setup(props) {
    const { value, error, touched, handleBlur } = useField<string>(props.name)

    return {
      value,
      error,
      touched,
      handleBlur,
    }
  },
})
</script>

<template>
  <sdl-input
    v-model="value"
    @blur="handleBlur"
    :error="touched ? error : undefined"
    :placeholder="placeholder"
    :theme="theme"
    :type="type"
  />
</template>
