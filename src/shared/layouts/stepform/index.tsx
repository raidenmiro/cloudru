import cc from 'classcat'
import type { ReactNode } from 'react'

import { Stepper } from '@/shared/lib/stepper'

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
