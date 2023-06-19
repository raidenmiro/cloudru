import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { sendForm } from '@/shared/api'
import { useLayoutProps } from '@/shared/layouts/stepform/context'
import { usePersistForm } from '@/shared/lib/hooks/use-persist-form'
import { Button } from '@/shared/view/button'
import { Input } from '@/shared/view/input'

import s from './index.module.css'
import { bioSchema } from './schema'
import { ChoiceGender } from './ui/choice-gender'
import { FieldControl } from './ui/field'

export const Bio = () => {
  const { nextPage } = useLayoutProps()
  const [loading, setLoading] = useState(false)
  const { control, formState, handleSubmit, register, setValue, watch } =
    useForm({
      resolver: yupResolver(bioSchema)
    })

  usePersistForm('bio', { setValue, watch })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      await sendForm(data)
      nextPage()
    } finally {
      setLoading(false)
    }
  })

  return (
    <form className={s.paper} onSubmit={onSubmit}>
      <FieldControl>
        <Input
          {...register('nickname')}
          aria-invalid={Boolean(formState.errors.nickname)}
          className={s.input}
          label="Nickname"
          placeholder="placeholder"
          variant="secondary"
        />
        <ErrorMessage as="p" errors={formState.errors} name="nickname" />
      </FieldControl>

      <FieldControl>
        <Input
          {...register('name')}
          aria-invalid={Boolean(formState.errors.name)}
          className={s.input}
          label="Name"
          placeholder="placeholder"
          variant="secondary"
        />
        <ErrorMessage as="p" errors={formState.errors} name="name" />
      </FieldControl>

      <FieldControl>
        <Input
          {...register('surname')}
          aria-invalid={Boolean(formState.errors.surname)}
          className={s.input}
          label="Surname"
          placeholder="placeholder"
          variant="secondary"
        />
        <ErrorMessage as="p" errors={formState.errors} name="surname" />
      </FieldControl>

      <FieldControl>
        <Controller
          control={control}
          name="sex"
          render={({ field }) => <ChoiceGender {...field} />}
        />
        <ErrorMessage as="p" errors={formState.errors} name="sex" />
      </FieldControl>

      <footer className={s.footer}>
        <Button
          className={s.button}
          kind="outline"
          onClick={() => history.back()}
          type="button">
          Назад
        </Button>
        <Button
          className={s.button}
          disabled={loading}
          loading={loading}
          type="submit">
          Далее
        </Button>
      </footer>
    </form>
  )
}
Bio.displayName = 'Bio.Step'
