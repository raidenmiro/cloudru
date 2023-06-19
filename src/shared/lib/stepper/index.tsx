import cc from 'classcat'
import type { ReactElement, ReactNode } from 'react'
import { Children, Fragment } from 'react'

import s from './index.module.css'

interface RootProps {
  children: ReactNode
  className?: string
  onPageChanged(page: number): void
  page: number
}

const Root = ({ children, className, onPageChanged, page }: RootProps) => {
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
              isActive={index === currentIndex}
              isCompleted={index < currentIndex}
              label={steps[index].props.label}
              onPressed={() => onPageChanged(index + 1)}
            />
            {index < steps.length - 1 && (
              <Divider isFinished={index < currentIndex} />
            )}
          </Fragment>
        ))}
      </div>
      <div className={className} data-page={page}>
        {stepContent}
      </div>
    </>
  )
}
Root.displayName = 'Stepper.Root'

interface StepIndicatorProps {
  isActive: boolean
  isCompleted: boolean
  label: string
  onPressed(): void
}

const Indicator = ({
  isActive,
  isCompleted,
  label,
  onPressed
}: StepIndicatorProps) => {
  const classes = cc([
    s.step_item,
    isActive && s.is_active,
    isCompleted && s.is_completed
  ])

  return (
    <button className={classes} onClick={onPressed}>
      <div className={s.step_label}>{label}</div>
    </button>
  )
}
Indicator.displayName = 'Stepper.Indicator'

interface StepProps {
  children: ReactNode
  description: string
  label?: string
}

const Step = ({ children, description }: StepProps) => (
  <div aria-label={description}>{children}</div>
)
Step.displayName = 'Stepper.Step'

const Divider = ({ isFinished }: { isFinished: boolean }) => (
  <div className={cc([s.divider, isFinished && s.is_filled])} />
)
Divider.displayName = 'Stepper.Divider'

export const Stepper = Object.assign(Root, { Step })
