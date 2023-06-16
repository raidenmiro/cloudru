import { Input } from '@/shared/view/input'

import s from './index.module.css'
import { ChoiceGender } from './ui/choice-gender'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { bioSchema } from './schema'
import { Button } from '@/shared/view/button'
import { useLayoutProps } from '@/shared/layouts/stepform/context'
import { router } from '@/pages/router'
import { usePersistForm } from '@/shared/lib/hooks/use-presist-form'

export const Bio = () => {
  const { nextPage } = useLayoutProps()
  const { watch, setValue, register, handleSubmit } = useForm({
    resolver: yupResolver(bioSchema),
    mode: 'onChange'
  })

  usePersistForm('bio', { setValue, watch })

  const submit = () => {
    nextPage()
  }

  return (
    <form className={s.paper} onSubmit={handleSubmit(submit)}>
      <Input
        {...register('nickname')}
        placeholder="placeholder"
        className={s.input}
        label="Nickname"
        variant="secondary"
      />
      <Input
        {...register('name')}
        placeholder="placeholder"
        className={s.input}
        label="Name"
        variant="secondary"
      />
      <Input
        {...register('surname')}
        placeholder="placeholder"
        className={s.input}
        label="Surname"
        variant="secondary"
      />
      <ChoiceGender />
      <footer className={s.footer}>
        <Button kind="outline" type="button" onClick={() => router.go('/')}>
          Назад
        </Button>
        <Button>Далее</Button>
      </footer>
    </form>
  )
}
Bio.displayName = 'Bio.Step'
