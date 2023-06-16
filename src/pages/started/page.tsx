import type { ComponentPropsWithoutRef, FormEvent } from 'react'
import { forwardRef } from 'react'
import { useState } from 'react'

import { FormattedInput } from '@/shared/lib/formatinput'
import { Avatar } from '@/shared/view/avatar'
import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'
import { Input } from '@/shared/view/input'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePersistForm } from '@/shared/lib/hooks/use-presist-form'
import { router } from '../router'
import { data } from './data'
import { startedForm } from './schema'
import s from './index.module.css'
import { ErrorMessage } from '@hookform/error-message'

/**
 *
 * because we use custom error message in react-hook-form we need to use `noValidate`
 */
export const Started = () => {
  const { watch, setValue, register, formState } = useForm({
    resolver: yupResolver(startedForm),
    mode: 'onChange'
  })

  usePersistForm('started', { setValue, watch })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // router.go('/started')
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
          <PhoneInput {...register('phone')} />
          <ErrorMessage errors={formState.errors} name="phone" />
          <Input
            type="email"
            label="Email"
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
