import type { InputHTMLAttributes, PropType } from 'vue'
import { StringRequired } from 'utils/constants'

export const props = {
  placeholder: StringRequired,
  error: String,
  theme: {
    type: String as PropType<'bordered'>,
    default: null,
  },
  autocomplete: String as PropType<InputHTMLAttributes['autocomplete']>,
  autofocus: String as PropType<InputHTMLAttributes['autofocus']>,
  type: String as PropType<InputHTMLAttributes['type']>,
  modelValue: [String, Number],
}
