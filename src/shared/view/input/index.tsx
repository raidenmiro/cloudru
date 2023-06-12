import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react'
import { useId } from 'react'

import s from './index.module.css'

type BaseInput = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'prefix'>
export interface InputProps extends BaseInput {
  label: string
  onValueChanged?(value: string): void
  prefix: ReactNode
  postfix: ReactNode
  size?: 'L' | 'M' | 'S'
  variant?: 'primary' | 'secondary'
}

export const Input = ({
  label,
  prefix,
  postfix,
  onChange,
  size = 'L',
  variant = 'primary',
  onValueChanged,
  ...props
}: InputProps) => {
  const a11yId = useId()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChanged?.(e.target.value)
    onChange?.(e)
  }

  return (
    <div className={s.field}>
      <label htmlFor={a11yId}>{label}</label>
      <input
        {...props}
        id={a11yId}
        className={s.input}
        data-size={size}
        data-variant={variant}
        onChange={handleChange}
      />
    </div>
  )
}
