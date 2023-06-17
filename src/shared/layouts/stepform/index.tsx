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
    <div className={cc([s.container, className])} data-step={page}>
      <Content>{children}</Content>
    </div>
  )
}

const Content = ({ children }: Pick<StepFormProps, 'children'>) => {
  const { choiceStep, page } = useLayoutProps()

  return (
    <Stepper className={s.content} onPageChanged={choiceStep} page={page}>
      {children}
    </Stepper>
  )
}
