import type { ButtonHTMLAttributes, PropType } from 'vue'
import {
  BooleanOptional,
  NumberOptional,
  StringOptional,
  StringRequired,
} from 'utils/constants'
import style from './SdlButton.module.scss'

export type Size = 'md' | 'sm'
export type Theme = 'light' | 'dark'

export const btnProps = {
  mt: NumberOptional,
  tag: {
    type: String,
    default: 'button',
  },
  class: StringOptional,
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: null,
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  theme: {
    type: String as PropType<Theme>,
    default: 'light',
  },
  disabled: BooleanOptional,
}
export const linkProps = {
  ...btnProps,
  to: StringRequired,
}

export const computeClasses = ({ size, disabled, theme, class: className }: {
  size: Size
  theme: Theme
  disabled?: boolean
  class: string
}) => ([
  style.btn,
  style[`btn__size-${size}`],
  style[`btn__theme-${theme}`],
  disabled && style.btn__disabled,
  className,
])
