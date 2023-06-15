import cc from 'classcat'
import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

import { usePrevious } from '@/shared/lib/hooks/use-previos'

import s from './index.module.css'
import { adjustHeight } from './lib'
import { amountOfChars } from '@/shared/lib/string'

type BaseProps = ComponentPropsWithoutRef<'textarea'>

export interface TextareaProps extends BaseProps {
  label: string
  maxHeight?: number | string
  submitOnEnter?: boolean
}

export const TextArea = ({
  className,
  maxHeight = '500px',
  label,
  ...props
}: TextareaProps) => {
  const [value, setInput] = useState('')
  const previous = usePrevious(value)
  const ref = useRef<HTMLTextAreaElement>(null)

  const a11yId = useId()
  const count = amountOfChars(value)

  useEffect(() => {
    const textarea = ref.current
    if (!textarea) return

    if (previous !== value) {
      adjustHeight(textarea, maxHeight)
    }
  }, [maxHeight, previous, value])

  return (
    <div className={s.paper}>
      <label htmlFor={a11yId}>{label}</label>
      <textarea
        ref={ref}
        {...props}
        id={a11yId}
        value={value}
        className={cc([s.textarea, className])}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={s.footer}>
        <span>Tip</span>
        <span>{count}</span>
      </div>
    </div>
  )
}
