import type { InputHTMLAttributes, PropType } from 'vue'
import { StringRequired } from 'utils/constants'

export const props = {
  placeholder: StringRequired,
  error: String,
  type: String as PropType<InputHTMLAttributes['type']>,
  modelValue: [String, Number],
}
