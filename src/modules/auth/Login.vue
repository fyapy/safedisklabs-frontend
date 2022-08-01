<script lang="ts">
import { defineComponent } from 'vue'
import SdlLoginForm from '../../forms/SdlLoginForm.vue'

export default defineComponent({
  components: {
    SdlLoginForm,
  },
})
</script>

<template>
  <sdl-login-form
    title="Sign in"
    description="New to SafeDiskLabs?"
    link-text="Create an account"
    link="/register"
  />
</template>
