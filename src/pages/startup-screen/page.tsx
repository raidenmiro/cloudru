import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { sendForm } from '@/shared/api'
import { FormattedInput } from '@/shared/lib/formatinput'
import { usePersistForm } from '@/shared/lib/hooks/use-persist-form'
import { Avatar } from '@/shared/view/avatar'
import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'
import { Input } from '@/shared/view/input'

import { paths, router } from '../router'
import { data } from './data'
import s from './index.module.css'
import { startedForm } from './schema'

/**
 * because we use custom error message in react-hook-form we need to use `noValidate` attribute
 * @see https://doka.guide/html/novalidate/
 */
export const StartupScreen = () => {
  const { formState, handleSubmit, register, setValue, watch } = useForm({
    resolver: yupResolver(startedForm)
  })

  usePersistForm('started', { setValue, watch }) // sync with localStorage

  const onSubmit = handleSubmit((data) => {
    sendForm(data).then(() => {
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
        <form className={s.form} noValidate onSubmit={onSubmit}>
          <PhoneInput
            {...register('phone')}
            aria-invalid={Boolean(formState.errors.phone)}
          />
          <ErrorMessage errors={formState.errors} name="phone" />
          <Input
            aria-invalid={Boolean(formState.errors.email)}
            label="Email"
            placeholder="tim.jennings@example.com"
            type="email"
            {...register('email')}
          />
          <ErrorMessage errors={formState.errors} name="email" />
          <Button kind="filled" type="submit">
            Начать
          </Button>
        </form>
      </main>
    </section>
  )
}

const Socials = () => (
  <ul className={s.socials}>
    {data.map((item) => (
      <li key={item.id}>
        <Icon path="sprite/folder" />
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.label}
        </a>
      </li>
    ))}
  </ul>
)

type InputProps = ComponentPropsWithoutRef<'input'>

const PhoneInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [value, setValue] = useState('')

  return (
    <FormattedInput
      ref={ref}
      {...props}
      label="Номер телефона"
      mask="+# (###) ### ## ##"
      name="phone"
      onChangeValue={setValue}
      placeholder="+7 (999) 999 99 99"
      value={value}
    />
  )
})
