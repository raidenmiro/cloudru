import type { FormEvent } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

import { FormattedInput } from '@/shared/lib/formatinput'
import { Avatar } from '@/shared/view/avatar'
import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'
import { Input } from '@/shared/view/input'

import { data } from './data'
import s from './index.module.css'
import { router } from '../router'

export function Started() {
  const ref = useRef<HTMLFormElement>(null)

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
        <form ref={ref} className={s.form} onSubmit={handleSubmit}>
          <PhoneInput />
          <Input
            name="email"
            label="Email"
            placeholder="tim.jennings@example.com"
          />
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

const PhoneInput = () => {
  const [value, setValue] = useState('')
  return (
    <FormattedInput
      name="phone"
      label="Номер телефона"
      placeholder="+7 (999) 999 99 99"
      mask="+# (###) ### ## ##"
      value={value}
      onChange={setValue}
    />
  )
}
