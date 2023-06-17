import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { FormAnswer } from '@/shared/api'
import { sendForm } from '@/shared/api'
import { useLayoutProps } from '@/shared/layouts/stepform/context'
import { usePersistForm } from '@/shared/lib/hooks/use-persist-form'
import { useToggle } from '@/shared/lib/hooks/use-toggle'
import { Button } from '@/shared/view/button'
import { TextArea } from '@/shared/view/textarea'

import { FinallyModal } from './finally'
import s from './index.module.css'
import { aboutMeSchema } from './schema'

const NOOP = { message: '', status: 'error' } as const

export const AboutMe = () => {
  const [open, { setFalsy, setTruthy }] = useToggle(false)
  const { prevPage } = useLayoutProps()

  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<FormAnswer>(NOOP)

  const { handleSubmit, register, setValue, watch } = useForm({
    resolver: yupResolver(aboutMeSchema)
  })

  usePersistForm('aboutme', { setValue, watch })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    try {
      const answer = await sendForm(data)
      setAnswer(answer)
      setTruthy()
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <TextArea
        {...register('aboutme')}
        label="About"
        maxHeight={120}
        maxLength={200}
      />
      <footer className={s.footer}>
        <Button kind="outline" onClick={() => prevPage()} type="button">
          Назад
        </Button>
        <Button disabled={loading} loading={loading} type="submit">
          Отправить
        </Button>
      </footer>
      <FinallyModal onHide={setFalsy} open={open} type={answer.status} />
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
