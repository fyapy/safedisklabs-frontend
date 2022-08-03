import type { InputHTMLAttributes, PropType } from 'vue'
import { StringRequired } from 'utils/constants'

export const props = {
  placeholder: StringRequired,
  error: String,
  theme: {
    type: String as PropType<'bordered'>,
    default: null,
  },
  type: String as PropType<InputHTMLAttributes['type']>,
  modelValue: [String, Number],
}
