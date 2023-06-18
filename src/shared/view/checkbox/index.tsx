import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './index.module.css'

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className={s.paper}>
        <input ref={ref} {...props} className={s.checkbox} type="checkbox" />
        <span aria-hidden className={s.label} />
        <span>{label}</span>
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'
