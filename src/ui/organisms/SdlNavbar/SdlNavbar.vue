<script lang="ts">
import { defineComponent } from 'vue'
import { SdlLogo, SdlIcon } from 'ui/atoms'
import { color } from 'ui/theme'
import { DiskStorage } from './components'

export default defineComponent({
  components: {
    SdlLogo,
    SdlIcon,
    DiskStorage,
  },
  setup() {
    return {
      color,
      links: [
        {
          text: 'My Disk',
          to: '/dashboard',
          icon: 'disk',
        },
        {
          text: 'Starred',
          to: '/starred',
          icon: 'star',
        },
        {
          text: 'Hidden',
          to: '/hidden',
          icon: 'closed-eye',
        },
        {
          text: 'Bin',
          to: '/bin',
          icon: 'bin',
        },
      ] as const,
    }
  },
})
</script>

<template>
  <div :class="$style.spacer">
    <div :class="$style.wrapper">
      <sdl-logo :class="$style.logo" :height="28" :width="28" />

      <div class="flow-column align-center justify-between flex-1">
        <div :class="$style.links">
          <router-link
            v-for="{ to, icon, text } in links"
            :key="to"
            :to="to"
            :class="$style.link"
            exact-active-class="active"
          >
            <sdl-icon
              :name="icon"
              width="20"
              height="20"
              :fill="color.textGray"
            />
            <div>{{ text }}</div>
          </router-link>
        </div>

        <div class="flow-column align-center">
          <disk-storage />

          <div :class="$style.bottom">
            <div>
              <sdl-icon
                name="gear"
                width="20"
                height="20"
                :fill="color.textGray"
              />
            </div>
            <div>
              <sdl-icon
                name="profile"
                width="20"
                height="20"
                :fill="color.textGray"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.spacer {
  width: 72px;
}
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  width: 72px;

  display: flex;
  flex-flow: column;
  align-items: center;

  overflow-y: auto;
  background-color: $backgroundGrayDark3;
}
.logo {
  margin: 33px 0 51px;
}
.link {
  position: relative;

  height: 64px;
  width: 72px;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    bottom: 0;

    width: 3px;

    transition: opacity .3s ease;
    opacity: 0;
    border-radius: 3px;
    background-color: $primary2;
    box-shadow: 0px 4px 16px rgba(3, 195, 73, .45);
  }
  &:hover:after {
    opacity: .3;
  }
  &:global(.active) {
    &:after {
      opacity: 1;
    }

    svg > use {
      fill: $primaryOpacity90;
    }
    > div {
      color: $primary;
    }
  }

  > div {
    margin-top: 2px;

    color: $textGray;
    font-size: 10px;
  }
}
.links {
  display: flex;
  flex-flow: column;
}
.bottom {
  width: 44px;
  margin-bottom: 16px;

  border-radius: 8px;
  border: 1px solid $textGrayOpacity35;

  > * {
    padding: 12px;

    display: flex;

    cursor: pointer;

    &:hover svg > use {
      fill: $primaryOpacity90;
    }

    svg > use {
      transition: fill .3s ease;
    }
  }
}
</style>
