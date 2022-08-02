<script lang="ts">
import type { RegisterValues } from './types'
import { useForm, isInvalid } from 'formis'
import { computed, defineComponent } from 'vue'
import { useAuthStore } from 'ducks/auth'
import { SdlLogo, SdlButton } from 'ui/atoms'
import { SdlFieldText } from 'ui/molecules'
import { StringRequired } from 'utils/constants'
import { required, isNotEmail } from 'utils/validate'
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

    const { errors, isSubmitting, handleSubmit } = useForm<RegisterValues>({
      initialValues: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
      },
      validate({ username, email, password, passwordRepeat }, errors) {
        if (required(username)) errors.username = i18n.REQUIRED
        if (isNotEmail(email)) errors.email = i18n.INVALID_EMAIL
        if (required(email)) errors.email = i18n.REQUIRED
        if (passwordRepeat !== password) errors.password = i18n.PASSWORDS_NOT_MATCH
        if (required(password)) errors.password = i18n.REQUIRED
        if (required(passwordRepeat)) errors.passwordRepeat = i18n.REQUIRED

        return errors
      },
    })

    const isDisabled = computed(() => isSubmitting.value || isInvalid(errors, [
      'username',
      'email',
      'password',
      'passwordRepeat',
    ]))

    const handleFormSubmit = handleSubmit(values => authStore.register(values))

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
    <sdl-logo :width="56" :height="56" />
    <div :class="style.title">
      Sign up
    </div>
    <div :class="style.meta">
      Already have a SafeDiskLabs account?<br>
      <router-link to="/">
        Sign in
      </router-link>
    </div>

    <sdl-field-text name="username" placeholder="Username" />
    <sdl-field-text name="email" placeholder="Email" />
    <sdl-field-text name="password" placeholder="Password" type="password" />
    <sdl-field-text name="passwordRepeat" placeholder="Repeat password" type="password" />

    <sdl-button :mt="12" :disabled="isDisabled">
      Sign up
    </sdl-button>
  </form>
</template>
