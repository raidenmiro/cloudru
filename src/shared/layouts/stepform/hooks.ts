import { useEffect, useRef } from 'react'
import { useLayoutProps } from './context'

export function useWatchSubmit(cb: () => void) {
  const { stepObserver } = useLayoutProps()
  const stableCb = useRef(cb)

  useEffect(() => {
    const fn = stableCb.current
    stepObserver.addListener(fn)
    return () => {
      stepObserver.removeListener(fn)
    }
  }, [cb, stepObserver])
}
