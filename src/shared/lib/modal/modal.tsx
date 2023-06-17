import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useHotkey } from '../hooks/use-hotkey'
import { Backdrop } from './backdrop'

const getRoot = () => document.querySelector('modal-root') ?? document.body

export interface ModalProps {
  children: ReactNode
  className?: string
  description: string
  onHide(): void
  open: boolean
  title: string
}

export const Modal = ({
  children,
  className,
  description,
  onHide,
  open,
  title
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useHotkey({ Escape: () => onHide() })

  useEffect(() => {
    const node = modalRef.current

    if (node) disableBodyScroll(node)
    return () => {
      if (node) enableBodyScroll(node)
    }
  }, [])

  if (!open) {
    return null
  }

  return createPortal(
    <Backdrop onPress={onHide} open={open}>
      <div
        className={className}
        ref={modalRef}
        {...getA11y(title, description)}>
        {children}
      </div>
    </Backdrop>,
    getRoot()
  )
}

function getA11y(title: string, description: string) {
  return {
    'aria-describedby': description,
    'aria-labelledby': title,
    'aria-modal': true,
    'role': 'dialog'
  }
}
