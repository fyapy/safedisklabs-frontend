<script lang="ts">
import { useField } from 'formis'
import { defineComponent } from 'vue'
import { StringRequired } from '../../utils/constants'
import { SdlInput, props } from '../atoms/SdlInput'

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
    :placeholder="$props.placeholder"
    :type="$props.type"
  />
</template>
