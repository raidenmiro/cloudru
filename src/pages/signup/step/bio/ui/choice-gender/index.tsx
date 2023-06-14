import { useId } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/view/select'

import s from './index.module.css'

export function ChoiceGender() {
  const a11yId = useId()

  return (
    <div className={s.paper}>
      <Select>
        <label htmlFor={a11yId}>Sex</label>
        <SelectTrigger id={a11yId}>
          <SelectValue placeholder="Ничего не выбрано" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">man</SelectItem>
          <SelectItem value="dark">woman</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
