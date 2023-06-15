import { createPortal } from 'react-dom'
import { useHotkey } from '../hooks/use-hotkey'
import { Backdrop } from './backdrop'
import type { ReactNode } from 'react'

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
  open,
  onHide,
  children,
  title,
  className,
  description
}: ModalProps) => {
  useHotkey({ Escape: () => onHide() })

  if (!open) {
    return null
  }

  return createPortal(
    <Backdrop open={open} onPress={onHide}>
      <div className={className} {...getA11y(title, description)}>
        {children}
      </div>
    </Backdrop>,
    getRoot()
  )
}

function getA11y(title: string, description: string) {
  return {
    'role': 'dialog',
    'aria-modal': true,
    'aria-labelledby': title,
    'aria-describedby': description
  }
}
