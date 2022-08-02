<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useNotificationsStore } from 'ducks/notifications'
import SdlNotification from 'ui/molecules/SdlNotification.vue'

export default defineComponent({
  components: {
    SdlNotification,
  },
  setup() {
    const notificationsStore = useNotificationsStore()

    const notifications = computed(() => notificationsStore.notifications)

    return {
      notifications,
      notificationsStore,
    }
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <sdl-notification
      v-for="notify in notifications"
      :key="notify.id"
      :type="notify.type"
      :text="notify.text"
      :timeout="notify.timeout"
      :close="() => notificationsStore.remove(notify.id)"
    />
  </div>
</template>

<style module lang="scss">
.wrapper {
  position: fixed;
  right: 55px;
  bottom: 56px;
  z-index: 80;
}
</style>
