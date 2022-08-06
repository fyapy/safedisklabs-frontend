import { reactive, ref } from 'vue'
import { useListener } from './useListener'

export const ContextMenus = {
  _subscribtions: [] as Array<() => boolean>,
  unsubscribeAll() {
    this._subscribtions.map(fn => fn())
    this._subscribtions = []
  },
  subscribe(fn: () => any) {
    this._subscribtions.push(fn)
  },
}

export const useEditDropdown = () => {
  const dropdownState = reactive({
    visible: false,
    top: 0,
    left: 0,
  })
  const wrapperRef = ref<HTMLDivElement | null>(null)

  function handleContextMenu(e: MouseEvent) {
    ContextMenus.unsubscribeAll()

    dropdownState.top = e.pageY - window.scrollY
    dropdownState.left = e.pageX
    dropdownState.visible = true

    ContextMenus.subscribe(handleClose)
  }
  const handleClose = () => dropdownState.visible = false
  const handleMissClick = (e: MouseEvent) => !wrapperRef.value?.contains(e.target as Node)
    && handleClose()


  useListener('scroll', window, handleClose)
  useListener('click', document, handleMissClick)

  return {
    handleContextMenu,
    wrapperRef,
    dropdownState,
    handleClose,
  }
}
