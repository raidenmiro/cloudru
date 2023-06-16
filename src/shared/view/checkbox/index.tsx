import type { ComponentPropsWithoutRef } from 'react'
import s from './index.module.css'

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className={s.paper}>
      <input {...props} type="checkbox" className={s.checkbox} />
      <span aria-hidden className={s.label} />
      <span>{label}</span>
    </label>
  )
}
