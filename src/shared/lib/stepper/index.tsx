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

const Root = ({ page, children, onPageChanged, className }: RootProps) => {
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
              onPressed={() => onPageChanged(index + 1)}
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
      <div className={className}>{stepContent}</div>
    </>
  )
}

const Indicator = ({
  label,
  isActive,
  isCompleted,
  onPressed
}: {
  label: string
  isActive: boolean
  isCompleted: boolean
  onPressed(): void
}) => {
  return (
    <button
      onClick={onPressed}
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
  children: ReactNode
  description: string
  label: string
}

const Step = ({ children }: StepProps) => {
  return <div>{children}</div>
}

const Divider = ({ isFinished }: { isFinished: boolean }) => (
  <div className={cc([s.divider, isFinished && s.is_filled])} />
)

export const Stepper = Object.assign(Root, { Step })
