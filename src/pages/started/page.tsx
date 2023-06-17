import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import type { ComponentPropsWithoutRef, FormEvent } from 'react'
import { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormattedInput } from '@/shared/lib/formatinput'
import { usePersistForm } from '@/shared/lib/hooks/use-presist-form'
import { Avatar } from '@/shared/view/avatar'
import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'
import { Input } from '@/shared/view/input'

import { router } from '../router'
import { data } from './data'
import s from './index.module.css'
import { startedForm } from './schema'

/**
 *
 * because we use custom error message in react-hook-form we need to use `noValidate`
 */
export const Started = () => {
  const { watch, setValue, register, formState } = useForm({
    resolver: yupResolver(startedForm)
  })

  usePersistForm('started', { setValue, watch })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.go('/started')
  }

  return (
    <section className={s.card}>
      <header className={s.header}>
        <Avatar fallback="RK" />
        <div className={s.details}>
          <span>Robert Kuzhin</span>
          <Socials />
        </div>
      </header>
      <main className={s.main}>
        <form className={s.form} onSubmit={handleSubmit} noValidate>
          <PhoneInput
            {...register('phone')}
            aria-invalid={Boolean(formState.errors.phone)}
          />
          <ErrorMessage errors={formState.errors} name="phone" />
          <Input
            type="email"
            label="Email"
            aria-invalid={Boolean(formState.errors.email)}
            placeholder="tim.jennings@example.com"
            {...register('email')}
          />
          <ErrorMessage errors={formState.errors} name="email" />
          <Button type="submit" kind="filled">
            Начать
          </Button>
        </form>
      </main>
    </section>
  )
}

const Socials = () => {
  return (
    <ul className={s.socials}>
      {data.map((item) => (
        <li key={item.id}>
          <Icon path="sprite/folder" />
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

const PhoneInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  const [value, setValue] = useState('')
  return (
    <FormattedInput
      ref={ref}
      {...props}
      name="phone"
      label="Номер телефона"
      placeholder="+7 (999) 999 99 99"
      mask="+# (###) ### ## ##"
      value={value}
      onChangeValue={setValue}
    />
  )
})
