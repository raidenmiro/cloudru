import cc from 'classcat'

import { router } from '@/pages/router'
import { Modal } from '@/shared/lib/modal/modal'
import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'

import s from './index.module.css'

const Result = {
  fail: {
    action: {
      onPress: (onClose?: () => void) => onClose?.(),
      text: 'Закрыть'
    },
    content: 'sprite/failure',
    title: 'Ошибка'
  },
  success: {
    action: {
      onPress: () => router.go('/'),
      text: 'На главную'
    },
    content: 'sprite/success',
    title: 'Форма успешно отправлена'
  }
} as const

interface FinallyModalProps {
  onHide(): void
  open: boolean
  type: keyof typeof Result
}

export const FinallyModal = ({ onHide, open, type }: FinallyModalProps) => {
  const { action, content, title } = Result[type]

  return (
    <Modal
      className={s.modal}
      description="Check your data"
      onHide={onHide}
      open={open}
      title="Completed">
      <header className={cc([s.header, type === 'success' && s.is_success])}>
        <h2>{title}</h2>
        <button className={s.close} data-type={type}>
          <Icon path="sprite/close" />
        </button>
      </header>
      <div className={s.content}>
        <span className={s.icon_wrapper} data-type={type}>
          <Icon className={s.indicator} path={content} />
        </span>
      </div>
      <footer className={cc([s.footer])} data-type={type}>
        <Button onClick={() => action.onPress(onHide)}>{action.text}</Button>
      </footer>
    </Modal>
  )
}
