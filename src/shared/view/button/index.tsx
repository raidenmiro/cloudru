import cc from 'classcat'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './index.module.css'

type BaseProps = ComponentPropsWithoutRef<'button'>
export interface ButtonProps extends BaseProps {
  children: ReactNode
  kind?: 'filled' | 'outline' | 'action'
  loading?: boolean
}

export const Button = ({
  children,
  className,
  kind = 'filled',
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button data-kind={kind} {...props} className={cc([s.button, className])}>
      {loading && <span aria-hidden className={s.spinner} />}
      {loading ? 'Отправка..' : children}
    </button>
  )
}
Button.displayName = 'View.Button'
