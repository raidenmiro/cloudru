import cc from 'classcat'

import { router } from '@/pages/router'
import { Modal } from '@/shared/lib/modal/modal'
import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'

import s from './index.module.css'

const Result = {
  fail: {
    content: 'sprite/failure',
    title: 'Ошибка',
    action: {
      text: 'Закрыть',
      onPress: (onClose?: () => void) => onClose?.()
    }
  },
  success: {
    content: 'sprite/success',
    title: 'Форма успешно отправлена',
    action: {
      text: 'На главную',
      onPress: () => router.go('/')
    }
  }
} as const

interface FinallyModalProps {
  onHide(): void
  open: boolean
  type: keyof typeof Result
}

export const FinallyModal = ({ open, type, onHide }: FinallyModalProps) => {
  const { action, content, title } = Result[type]

  return (
    <Modal
      open={open}
      onHide={onHide}
      title="Completed"
      className={s.modal}
      description="Check your data">
      <header className={cc([s.header, s.is_success])}>
        <h2>{title}</h2>
        <button className={s.close}>
          <Icon path="sprite/close" />
        </button>
      </header>
      <div className={s.content}>
        <Icon path={content} className={s.indicator}/>
      </div>
      <footer data-type={type} className={cc([s.footer])}>
        <Button onClick={() => action.onPress(onHide)}>{action.text}</Button>
      </footer>
    </Modal>
  )
}
