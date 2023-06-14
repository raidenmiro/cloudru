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
      <div className={cc([s.container, className])}>
        <Content>{children}</Content>
        <footer className={s.footer}>
          <Button kind="outline">Назад</Button>
          <Button>Далее</Button>
        </footer>
      </div>
    </StepFormProvider>
  )
}

const Content = ({ children }: Pick<StepFormProps, 'children'>) => {
  const { page } = useLayoutProps()

  return (
    <Stepper page={page}>
      <Stepper.Step label="1" description="Step 1 description">
        <main className={s.className}>{children}</main>
      </Stepper.Step>
      <Stepper.Step label="2" description="Step 2 description">
        2
      </Stepper.Step>
      <Stepper.Step label="3" description="Step 3 description">
        3
      </Stepper.Step>
    </Stepper>
  )
}
