export const StringOptional = {
  type: String,
  default: undefined,
} as const
export const StringRequired = {
  type: String,
  required: true,
} as const
export const NumberRequired = {
  type: Number,
  required: true,
} as const
export const NumberOptional = {
  type: Number,
  default: undefined,
} as const
export const BooleanOptional = {
  type: Boolean,
  default: undefined,
} as const
