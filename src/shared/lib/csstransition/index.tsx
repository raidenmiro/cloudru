import type { PropsWithChildren } from 'react'
import { cloneElement, isValidElement } from 'react'
import { useEffect, useState } from 'react'

// simplify implementation

interface Props {
  className?: string
  clearTime?: number
  enterTime?: number
  leaveTime?: number
  name?: string
  visible?: boolean
}

const defaultProps = {
  visible: false,
  enterTime: 60,
  leaveTime: 60,
  clearTime: 60,
  className: '',
  name: 'transition'
}

export type CssTransitionProps = Props

export const CssTransition = ({
  children,
  className,
  visible,
  enterTime,
  leaveTime,
  clearTime,
  name,
  ...props
}: PropsWithChildren<CssTransitionProps> & typeof defaultProps) => {
  const [classes, setClasses] = useState<string>('')
  const [renderable, setRenderable] = useState<boolean>(visible)

  useEffect(() => {
    const statusClassName = visible ? 'enter' : 'leave'
    const time = visible ? enterTime : leaveTime
    if (visible && !renderable) {
      setRenderable(true)
    }

    setClasses(`${name}-${statusClassName}`)

    const timer = setTimeout(() => {
      setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`)
      clearTimeout(timer)
    }, time)

    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses('')
        setRenderable(false)
      }
      clearTimeout(clearClassesTimer)
    }, time + clearTime)

    return () => {
      clearTimeout(timer)
      clearTimeout(clearClassesTimer)
    }
  }, [visible, renderable, enterTime, leaveTime, name, clearTime])
  if (!isValidElement(children) || !renderable) return null

  return cloneElement(children as never, {
    ...props,
    className: `${children.props.className} ${className} ${classes}`
  })
}
CssTransition.defaultProps = defaultProps