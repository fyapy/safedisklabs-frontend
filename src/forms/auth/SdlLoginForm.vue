<script lang="ts">
import type { LoginValues } from './types'
import { useForm, isInvalid } from 'formis'
import { computed, defineComponent } from 'vue'
import { useAuthStore } from 'ducks/auth'
import { SdlLogo, SdlButton } from 'ui/atoms'
import { SdlFieldText } from 'ui/molecules'
import { StringRequired } from 'utils/constants'
import { required } from 'utils/validate'
import i18n from 'i18n'
import style from './style.module.scss'

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
    const authStore = useAuthStore()

    const { errors, isSubmitting, handleSubmit } = useForm<LoginValues>({
      initialValues: {
        username: '',
        password: '',
      },
      validate({ username, password }, errors) {
        if (required(username)) errors.username = i18n.REQUIRED
        if (required(password)) errors.password = i18n.REQUIRED

        return errors
      },
    })

    const isDisabled = computed(() => isSubmitting.value || isInvalid(errors, ['username', 'password']))

    const handleFormSubmit = handleSubmit(values => authStore.login(values))

    return {
      handleFormSubmit,
      isDisabled,
      style,
    }
  },
})
</script>

<template>
  <form :class="style.wrapper" @submit="handleFormSubmit">
    <sdl-logo />
    <div :class="style.title">
      Sign in
    </div>
    <div :class="style.meta">
      New to SafeDiskLabs?<br>
      <router-link to="/register">
        Create an account
      </router-link>
    </div>

    <sdl-field-text name="username" placeholder="Username or email" />
    <sdl-field-text name="password" placeholder="Password" type="password" />

    <sdl-button :mt="12" :disabled="isDisabled">
      Sign in
    </sdl-button>
  </form>
</template>
