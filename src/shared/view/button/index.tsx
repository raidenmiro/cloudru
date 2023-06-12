import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './index.module.css'

type BaseProps = ComponentPropsWithoutRef<'button'>
export interface ButtonProps extends BaseProps {
  children: ReactNode
  kind?: 'filled' | 'outline'
}

export const Button = ({
  children,
  kind = 'filled',
  ...props
}: ButtonProps) => {
  return (
    <button data-kind={kind} {...props} className={s.button}>
      {children}
    </button>
  )
}
