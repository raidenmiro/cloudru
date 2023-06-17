import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import { CssTransition } from '../csstransition'
import s from './backdrop.module.css'

export interface BackdropProps {
  children: ReactNode
  onPress(): void
  open: boolean
}

const EVENTS = ['mousedown', 'touchstart']

export function Backdrop({ children, onPress, open }: BackdropProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ref = overlayRef.current

    if (!ref) return

    EVENTS.forEach((eventName) => ref.addEventListener(eventName, onPress))
    return () => {
      EVENTS.forEach((eventName) => ref.removeEventListener(eventName, onPress))
    }
  }, [onPress])

  return (
    <CssTransition clearTime={300} name={s.paper} visible={open}>
      <div className={s.backdrop} ref={overlayRef}>
        <div className={s.layer} />
        <div className={s.position}>{children}</div>
      </div>
    </CssTransition>
  )
}
