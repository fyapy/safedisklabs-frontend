import type { PropType, SVGAttributes } from 'vue'

export type IconName =
  | 'disk'
  | 'star'
  | 'closed-eye'
  | 'bin'
  | 'cloud'
  | 'gear'
  | 'profile'
  | 'filter'
  | 'search'
  | 'box-plus'
  | 'file'
  | 'new-folder'
  | 'upload-file'
  | 'upload-folder'
  | 'folder'

export const props = {
  name: {
    type: String as PropType<IconName>,
    required: true,
  },
  class: {
    type: String,
    default: undefined,
  },
  fill: String,
  color: String,
  size: String,
  stroke: String,
  strokeWidth: String,
  transform: String,
  width: String,
  height: String,
  click: Function as PropType<SVGAttributes['onClick']>,
}
