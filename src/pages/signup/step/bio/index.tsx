import { Input } from '@/shared/view/input'

import s from './index.module.css'
import { ChoiceGender } from './ui/choice-gender'

export const Bio = () => {
  return (
    <div className={s.paper}>
      <Input
        placeholder="placeholder"
        className={s.input}
        label="Nickname"
        variant="secondary"
      />
      <Input
        placeholder="placeholder"
        className={s.input}
        label="Name"
        variant="secondary"
      />
      <Input
        placeholder="placeholder"
        className={s.input}
        label="Surname"
        variant="secondary"
      />
      <ChoiceGender />
    </div>
  )
}
Bio.displayName = 'Bio.Step'
