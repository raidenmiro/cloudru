import { useCallback, useState } from 'react'

import { Button } from '@/shared/view/button'
import { TextArea } from '@/shared/view/textarea'

import { FinallyModal } from './finally'
import s from './index.module.css'

export const AboutMe = () => {
  const [open, setOpen] = useState(false)

  const hide = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextArea label="About" maxHeight={120} maxLength={200} />
      <footer className={s.footer}>
        <Button kind="outline" type="button">
          Назад
        </Button>
        <Button onClick={() => setOpen(true)}>Отправить</Button>
      </footer>
      <FinallyModal onHide={hide} open={open} type="fail" />
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
