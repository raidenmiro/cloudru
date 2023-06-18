import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './index.module.css'

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className={s.label}>
        <input ref={ref} type="radio" {...props} className={s.radio} />
        <span>{label}</span>
      </label>
    )
  }
)
Radio.displayName = 'Radio'
