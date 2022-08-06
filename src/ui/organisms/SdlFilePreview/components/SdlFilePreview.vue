<script setup lang="ts">
import { computed } from 'vue'
import { File, shareLink, useDiskStore } from 'ducks/disk'
import { SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { mimeTypeToIcon } from 'utils/selectors'
import style from './SdlPreview.module.scss'

const diskStore = useDiskStore()

const props = defineProps<{
  file: File
}>()

const fileIcon = computed(() => mimeTypeToIcon(props.file.meta?.mime))

const toggleHidden = () => diskStore.toggleHidden(props.file.id)
const toggleShared = () => diskStore.toggleShared(props.file.id)
const moveToBinOrRemove = () => diskStore.moveToBinOrRemove(props.file.id)
const copyLink = () => diskStore.copyLink(props.file.id)
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="style.header">
      <SdlIcon
        name="file"
        width="28"
        height="28"
        :fill="color.gray2"
      />
      File Preview
    </div>

    <div class="justify-center">
      <div v-if="file.type === 'folder'" :class="$style.content">
        <SdlIcon
          name="folder"
          width="170"
          height="170"
          :fill="color.gray2"
        />
      </div>

      <div v-else :class="$style.content">
        <SdlIcon
          name="blank-file"
          width="170"
          height="170"
          :fill="color.gray2"
        />
        <SdlIcon
          v-if="fileIcon"
          data-icon="image"
          :name="fileIcon"
          width="74"
          height="74"
          :fill="color.gray3"
        />
      </div>
    </div>

    <div :class="style.line"></div>

    <div :class="$style.name">{{ file.name }}</div>
    <div :class="$style.date">{{ file.createdAt }}</div>

    <div v-if="file.shared">
      <div :class="style.line"></div>

      <div :class="$style.shared__title">File Shared By Link:</div>
      <div :class="$style.shared">
        <SdlIcon
          name="share"
          width="28"
          height="28"
          :fill="color.primary2Opacity80"
        />

        <div :class="$style.shared__link">{{ shareLink(file.id, file.type) }}</div>

        <SdlIcon
          name="copy"
          width="19"
          height="19"
          :fill="color.gray2"
          @click="copyLink"
        />
      </div>
    </div>

    <div class="flex-1"></div>

    <div :class="style.line"></div>

    <div :class="$style.btns">
      <div @click="toggleShared">
        <div :class="$style.btn">
          <SdlIcon
            :name="file.shared ? 'lock' : 'share'"
            width="24"
            height="24"
            :fill="color.white"
          />
        </div>
        <div :class="$style.btn__text">{{ file.shared ? 'Unshare' : 'Share' }}</div>
      </div>

      <div @click="toggleHidden">
        <div :class="$style.btn">
          <SdlIcon
            name="closed-eye"
            width="24"
            height="24"
            :fill="color.white"
          />
        </div>
        <div :class="$style.btn__text">Hide</div>
      </div>

      <div @click="moveToBinOrRemove">
        <div :class="$style.btn">
          <SdlIcon
            name="bin"
            width="24"
            height="24"
            :fill="color.white"
          />
        </div>
        <div :class="$style.btn__text">Delete</div>
      </div>
    </div>

    <div :class="style.line"></div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  flex: 1;
  display: flex;
  flex-flow: column;
}
.content {
  position: relative;

  margin: 45px auto;

  [data-icon='image'] {
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);
  }
}
.name {
  margin: 28px 0 8px;

  font-size: 28px;
  font-weight: 600;
  overflow-wrap: anywhere;
}
.date {
  margin-bottom: 24px;

  font-weight: 600;
  color: $gray4;
}
.shared__title {
  margin: 28px 0 16px;
}
.shared__link {
  max-width: calc(350px - 24px - 28px - 19px);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
.shared {
  display: flex;
  align-items: center;

  svg {
    &:first-child {
      margin-right: 12px;
    }
    &:last-child {
      margin-left: 12px;

      cursor: pointer;

      &:hover > use {
        fill: $primary2Opacity80;
      }

      > use {
        transition: fill .3s ease;
      }
    }
  }
}
.btn {
  width: 56px;
  height: 56px;
  padding-top: 4px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid rgba(107, 107, 111, .4);
  user-select: none;
  cursor: pointer;
}
.btn__text {
  padding: 12px 0 4px;

  text-align: center;
  user-select: none;
  cursor: pointer;
}
.btns {
  margin: 26px 0;

  display: flex;
  justify-content: space-around;
}
</style>
