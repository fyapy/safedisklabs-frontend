import { onBeforeUnmount, onMounted, Ref } from 'vue'

const getTarget = (el: Ref<HTMLDivElement | undefined> | Document) => el instanceof Document
  ? el
  : el.value

export function useListener({ event, target, handler }: {
  event: string
  target: Ref<HTMLDivElement | undefined> | Document
  handler(e: Event): void
}) {
  onMounted(() => getTarget(target)?.addEventListener(event, handler))
  onBeforeUnmount(() => getTarget(target)?.removeEventListener(event, handler))
}
