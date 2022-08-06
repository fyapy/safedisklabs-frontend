<script setup lang="ts">
import { useDiskStore } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'

const props = defineProps<{
  id: string
  shared: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const diskStore = useDiskStore()

const toggleHidden = () => diskStore.toggleHidden(props.id)
const moveToBinOrRemove = () => diskStore.moveToBinOrRemove(props.id)
const toggleShared = () => diskStore.toggleShared(props.id)

const handleCopyLink = () => {
  emit('close')
  diskStore.copyLink(props.id)
}
</script>

<template>
  <div>
    <div v-if="shared" :class="$style.link" @click="handleCopyLink">
      <SdlIcon
        name="link"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      Copy link
    </div>
    <div :class="$style.link" @click="toggleShared">
      <SdlIcon
        :name="shared ? 'lock' : 'share'"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      {{ shared ? 'Restricted access (Unshare)' : 'Share' }}
    </div>
    <div :class="$style.link" @click="toggleHidden">
      <SdlIcon
        name="closed-eye"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      Hide
    </div>
    <div :class="$style.link" @click="moveToBinOrRemove">
      <SdlIcon
        name="bin"
        width="21"
        height="21"
        :fill="color.textGray"
      />
      Delete
    </div>
  </div>
</template>

<style module lang="scss">
.link {
  padding: 12px 16px;

  display: flex;

  cursor: pointer;
  transition: color .3s ease;

  &:hover {
    color: $primaryOpacity90;
  }
  &:first-child {
    padding-top: 16px;
  }
  &:last-child {
    padding-bottom: 16px;
  }

  svg {
    margin-right: 16px;
  }
  input {
    width: 1px;
    height: 1px;

    visibility: none;
  }
}
</style>
