import { forwardRef, useId } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/view/select'

import s from './index.module.css'

export interface ChoiceGenderProps {
  name: string
  onChange(config: { target: { name: string; value: string } }): void
  value?: string
}

export const ChoiceGender = forwardRef<HTMLButtonElement, ChoiceGenderProps>(
  ({ name, onChange, value }, ref) => {
    const a11yId = useId()

    return (
      <div className={s.paper}>
        <Select
          name={name}
          onValueChange={(v) => onChange({ target: { name: 'sex', value: v } })}
          value={value}>
          <label htmlFor={a11yId}>Sex</label>
          <SelectTrigger id={a11yId} ref={ref}>
            <SelectValue placeholder="Ничего не выбрано" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="man">man</SelectItem>
            <SelectItem value="woman">woman</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }
)
ChoiceGender.displayName = 'ChoiceGender'
