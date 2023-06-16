import type { LegacyRef, MutableRefObject, RefCallback } from 'react'

function mergeRefs<T extends HTMLElement>(
  ...refs: Array<MutableRefObject<T> | LegacyRef<T>>
): RefCallback<T> {
  return (value: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (typeof ref === 'object' && ref != null) {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    }
  }
}

export { mergeRefs }
