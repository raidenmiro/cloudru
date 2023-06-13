import cc from 'classcat'
import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef, useId } from 'react'

import s from './index.module.css'

type BaseInput = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'prefix'>
export interface InputProps extends BaseInput {
  label: string
  onValueChanged?(value: string): void
  prefix?: ReactNode
  postfix?: ReactNode
  size?: 'L' | 'M' | 'S'
  variant?: 'primary' | 'secondary'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      prefix,
      postfix,
      onChange,
      size = 'L',
      variant = 'primary',
      onValueChanged,
      className,
      ...props
    },
    ref
  ) => {
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
          ref={ref}
          id={a11yId}
          className={cc([s.input, className])}
          data-size={size}
          data-variant={variant}
          onChange={handleChange}
        />
      </div>
    )
  }
)
