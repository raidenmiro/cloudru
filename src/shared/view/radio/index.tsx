import type { ComponentPropsWithoutRef } from 'react'

import s from './index.module.css'

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <label className={s.label}>
      <input name="ratio" type="radio" {...props} className={s.radio} />
      <span>{label}</span>
    </label>
  )
}
