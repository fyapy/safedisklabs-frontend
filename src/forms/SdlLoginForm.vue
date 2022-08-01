<script lang="ts">
import type { LoginValues } from './types'
import { useForm, isInvalid } from 'formis'
import { computed, defineComponent } from 'vue'
import i18n from '../i18n'
import { SdlLogo, SdlButton } from '../ui/atoms'
import { SdlFieldText } from '../ui/molecules'
import { StringRequired } from '../utils/constants'
import { email, required } from '../utils/validate'

export default defineComponent({
  components: {
    SdlLogo,
    SdlButton,
    SdlFieldText,
  },
  props: {
    title: StringRequired,
    description: StringRequired,
    linkText: StringRequired,
    link: StringRequired,
  },
  setup() {
    const { errors, isSubmitting, handleSubmit } = useForm<LoginValues>({
      initialValues: {
        username: '',
        password: '',
      },
      validate({ username, password }, errors) {
        if (email(username)) errors.username = i18n.INVALID_EMAIL
        if (required(username)) errors.username = i18n.REQUIRED
        if (required(password)) errors.password = i18n.REQUIRED

        return errors
      },
    })

    const isDisabled = computed(() => isSubmitting.value || isInvalid(errors, ['username', 'password']))

    const handleFormSubmit = handleSubmit(values => {
      console.log(values)
    })

    return {
      handleFormSubmit,
      isDisabled,
    }
  },
})
</script>

<template>
  <form :class="$style.wrapper" @submit="handleFormSubmit">
    <sdl-logo :width="56" :height="56" />
    <div :class="$style.title">
      {{ $props.title }}
    </div>
    <div :class="$style.meta">
      {{ $props.description }}<br>
      <router-link :to="$props.link">
        {{ $props.linkText }}
      </router-link>
    </div>

    <sdl-field-text name="username" placeholder="Username or email" />
    <sdl-field-text name="password" placeholder="Password" />

    <sdl-button :mt="12" :disabled="isDisabled">
      Sign in
    </sdl-button>
  </form>
</template>

<style module lang="scss">
.wrapper {
  padding: 140px 0 40px;
  max-width: 380px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-flow: column;
  align-items: center;
}
.title {
  margin: 32px 0 16px;

  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: $primaryOpacity80;
}
.meta {
  margin-bottom: 32px;

  font-size: 14px;
  text-align: center;

  a {
    color: $primary;
  }
}
</style>
