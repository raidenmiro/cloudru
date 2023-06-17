import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { sendForm } from '@/shared/api'
import { usePersistForm } from '@/shared/lib/hooks/use-persist-form'
import { Avatar } from '@/shared/view/avatar'
import { Button } from '@/shared/view/button'
import { Input } from '@/shared/view/input'

import { paths, router } from '../router'
import s from './index.module.css'
import { startedForm } from './schema'
import { PhoneInput } from './ui/phone'
import { Socials } from './ui/socials'

export const StartupScreen = () => {
  const [loading, setLoading] = useState(false)
  const { formState, handleSubmit, register, setValue, watch } = useForm({
    resolver: yupResolver(startedForm)
  })

  usePersistForm('started', { setValue, watch }) // sync with localStorage

  const onSubmit = handleSubmit((data) => {
    setLoading(true)
    sendForm(data).then(() => {
      setLoading(false)
      router.go(paths.stepFormsScreen())
    })
  })

  return (
    <section className={s.card}>
      <header className={s.header}>
        <Avatar fallback="RK" />
        <div className={s.details}>
          <span>Роберт Кужин</span>
          <Socials />
        </div>
      </header>
      <main className={s.main}>
        <form className={s.form} onSubmit={onSubmit}>
          <PhoneInput
            aria-invalid={Boolean(formState.errors.phone)}
            {...register('phone')}
          />
          <ErrorMessage errors={formState.errors} name="phone" />
          <Input
            aria-invalid={Boolean(formState.errors.email)}
            placeholder="tim.jennings@example.com"
            {...register('email')}
            label="Email"
            type="email"
          />
          <ErrorMessage errors={formState.errors} name="email" />
          <Button
            disabled={loading}
            kind="filled"
            loading={loading}
            type="submit">
            Начать
          </Button>
        </form>
      </main>
    </section>
  )
}
