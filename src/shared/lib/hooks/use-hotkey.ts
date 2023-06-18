import { useCallback, useEffect, useRef } from 'react'

export const useHotkey = (config: Record<string, () => void>) => {
  const ref = useRef<HTMLElement>(null)

  const listener = useCallback(
    (evt: Event) => {
      if (isKeyboardEvent(evt) && evt.code in config && !isSpecial(evt)) {
        config[evt.code]()
      }
    },
    [config]
  )

  useEffect(() => {
    const target = ref.current ? ref.current : document

    target.addEventListener('keydown', listener)
    return () => {
      target.removeEventListener('keydown', listener)
    }
  }, [config.event, listener])

  return ref
}

function isKeyboardEvent(event: Event): event is KeyboardEvent {
  return 'code' in event
}

function isSpecial(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey
}
