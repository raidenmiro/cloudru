import type { ComponentPropsWithoutRef } from 'react'
import s from './index.module.css'

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <label className={s.label}>
      <input type="radio" name="ratio" {...props} className={s.radio} />
      <span>{label}</span>
    </label>
  )
}
