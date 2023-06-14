import cc from 'classcat'
import type { ReactElement, ReactNode } from 'react'
import { Children, Fragment } from 'react'

import s from './index.module.css'

interface RootProps {
  page: number
  children: ReactNode
}

const Root = ({ page, children }: RootProps) => {
  const arrifyChildren = Children.toArray(children) as ReactElement[]

  const steps = arrifyChildren.filter((step) => step.type === Step)
  const stepContent = arrifyChildren.at(page - 1)
  const currentIndex = page - 1

  return (
    <>
      <div className={s.stepper}>
        {Array.from({ length: steps.length }, (_, index) => (
          <Fragment key={index}>
            <Indicator
              label={steps[index].props.label}
              isActive={index === currentIndex}
              isCompleted={index < currentIndex}
            />
            {index < steps.length - 1 && (
              <Divider isFinished={index < currentIndex} />
            )}
          </Fragment>
        ))}
      </div>
      <div className={s.content}>{stepContent}</div>
    </>
  )
}

const Indicator = ({
  label,
  isActive,
  isCompleted
}: {
  label: string
  isActive: boolean
  isCompleted: boolean
}) => {
  return (
    <button
      className={cc([
        s.step_item,
        isActive && s.is_active,
        isCompleted && s.is_completed
      ])}>
      <div className={s.step_label}>{label}</div>
    </button>
  )
}

interface StepProps {
  label: string
  description: string
  children: ReactNode
}

const Step = ({ label, description, children }: StepProps) => {
  return <div>{children}</div>
}

const Divider = ({ isFinished }: { isFinished: boolean }) => (
  <div className={cc([s.divider, isFinished && s.is_filled])} />
)

export const Stepper = Object.assign(Root, { Step })
