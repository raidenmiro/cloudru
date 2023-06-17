import type { PointerEvent, ReactNode } from 'react'
import { useCallback, useRef } from 'react'

import { CssTransition } from '../csstransition'
import s from './backdrop.module.css'

export interface BackdropProps {
  children: ReactNode
  onPress(): void
  open: boolean
}

export function Backdrop({ children, onPress, open }: BackdropProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const onHandlePress = useCallback(
    (e: PointerEvent) => {
      const isPrimary = e.button === 0 && e.isPrimary

      if (isPrimary && e.target === overlayRef.current) {
        onPress()
      }
    },
    [onPress]
  )

  return (
    <CssTransition clearTime={1000} name={s.paper} visible={open}>
      <div
        className={s.backdrop}
        onPointerDown={onHandlePress}
        ref={overlayRef}>
        <div className={s.layer} />
        <div className={s.position}>{children}</div>
      </div>
    </CssTransition>
  )
}
