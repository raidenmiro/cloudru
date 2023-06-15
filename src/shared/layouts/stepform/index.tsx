import cc from 'classcat'
import type { ReactNode } from 'react'

import { Stepper } from '@/shared/lib/stepper'
import { Button } from '@/shared/view/button'

import { StepFormProvider, useLayoutProps } from './context'
import s from './index.module.css'

export interface StepFormProps {
  children: ReactNode
  className?: string
}

export function StepForm({ children, className }: StepFormProps) {
  return (
    <StepFormProvider>
      <Container className={className}>{children}</Container>
    </StepFormProvider>
  )
}

const Container = ({ children, className }: StepFormProps) => {
  const { page } = useLayoutProps()

  return (
    <div data-step={page} className={cc([s.container, className])}>
      <Content>{children}</Content>
      <Footer />
    </div>
  )
}

const Content = ({ children }: Pick<StepFormProps, 'children'>) => {
  const { page, choiceStep } = useLayoutProps()

  return (
    <Stepper page={page} onPageChanged={choiceStep} className={s.content}>
      {children}
    </Stepper>
  )
}

const Footer = () => {
  const { page, nextPage, prevPage } = useLayoutProps()
  return (
    <footer className={s.footer}>
      <Button kind="outline" onClick={prevPage}>
        Назад
      </Button>
      <Button onClick={nextPage}>{page === 3 ? 'Отправить' : 'Далее'}</Button>
    </footer>
  )
}
