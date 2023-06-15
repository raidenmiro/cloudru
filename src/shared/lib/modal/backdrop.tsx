import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
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
    <CssTransition name={s.paper} visible={open} clearTime={300}>
      <div ref={overlayRef} className={s.backdrop}>
        <div className={s.layer} />
        <div className={s.position}>{children}</div>
      </div>
    </CssTransition>
  )
}
