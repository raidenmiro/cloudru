import { Input } from '@/shared/view/input'

import s from './index.module.css'
import { ChoiceGender } from './ui/choice-gender'
import { useWatchSubmit } from '@/shared/layouts/stepform/hooks'
import { useRef } from 'react'

export const Bio = () => {
  const formRef = useRef<HTMLFormElement>(null)

  useWatchSubmit(() => {
    const form = formRef.current

    form?.dispatchEvent(
      new Event('submit', {
        cancelable: true
      })
    )
  })

  return (
    <form
      ref={formRef}
      className={s.paper}
      onSubmit={(e) => e.preventDefault()}>
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
    </form>
  )
}
Bio.displayName = 'Bio.Step'
