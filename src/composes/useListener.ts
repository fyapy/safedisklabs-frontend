import {
  onBeforeUnmount,
  onMounted,
  Ref,
  isRef,
} from 'vue'

type Target = Ref<HTMLDivElement | undefined> | Document | Window

const getTarget = (el: Target) => isRef(el)
  ? el.value
  : el

export function useListener(
  event: string,
  target: Target,
  handler: any,
) {
  onMounted(() => getTarget(target)?.addEventListener(event, handler))
  onBeforeUnmount(() => getTarget(target)?.removeEventListener(event, handler))
}
