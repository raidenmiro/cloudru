import cc from 'classcat'
import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef, useId } from 'react'

import s from './index.module.css'

type BaseInput = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'prefix'>
export interface InputProps extends BaseInput {
  label: string
  onValueChanged?(value: string): void
  paperClassName?: string
  postfix?: ReactNode
  prefix?: ReactNode
  size?: 'L' | 'M' | 'S'
  variant?: 'primary' | 'secondary'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      onChange,
      onValueChanged,
      paperClassName,
      postfix,
      prefix,
      size = 'L',
      variant = 'primary',
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
      <div className={cc([s.field, paperClassName])}>
        <label htmlFor={a11yId}>{label}</label>
        <input
          {...props}
          className={cc([s.input, className])}
          data-size={size}
          data-variant={variant}
          id={a11yId}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    )
  }
)
Input.displayName = 'View.Input'