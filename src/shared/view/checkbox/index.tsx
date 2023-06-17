import type { ComponentPropsWithoutRef } from 'react'

import s from './index.module.css'

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className={s.paper}>
      <input {...props} className={s.checkbox} type="checkbox" />
      <span aria-hidden className={s.label} />
      <span>{label}</span>
    </label>
  )
}
