import { Button } from '@/shared/view/button'
import { TextArea } from '@/shared/view/textarea'
import s from './index.module.css'
import { FinallyModal } from './finally'
import { useCallback, useState } from 'react'

export const AboutMe = () => {
  const [open, setOpen] = useState(false)

  const hide = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextArea label="About" maxHeight={130} maxLength={200} />
      <footer className={s.footer}>
        <Button kind="outline" type="button">
          Назад
        </Button>
        <Button onClick={() => setOpen(true)}>Отправить</Button>
      </footer>
      <FinallyModal open={open} onHide={hide} type="fail" />
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
