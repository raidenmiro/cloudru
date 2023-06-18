import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './index.module.css'

type BaseProps = ComponentPropsWithoutRef<'button'>
export interface ButtonProps extends BaseProps {
  children: ReactNode
  kind?: 'filled' | 'outline'
  loading?: boolean
}

export const Button = ({
  children,
  kind = 'filled',
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button data-kind={kind} {...props} className={s.button}>
      {loading && <span aria-hidden className={s.spinner} />}
      {loading ? 'Отправка..' : children}
    </button>
  )
}
Button.displayName = 'View.Button'
