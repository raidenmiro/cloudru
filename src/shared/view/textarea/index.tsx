import cc from 'classcat'
import type { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'

import { usePrevious } from '@/shared/lib/hooks/use-previos'
import { mergeRefs } from '@/shared/lib/merge-refs'
import { amountOfChars } from '@/shared/lib/string'

import s from './index.module.css'
import { adjustHeight } from './lib'

type BaseProps = ComponentPropsWithoutRef<'textarea'>

export interface TextareaProps extends BaseProps {
  label: string
  maxCountLetter?: number
  maxHeight?: number | string
  submitOnEnter?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      maxCountLetter = 200,
      maxHeight = '500px',
      onChange,
      value,
      ...props
    },
    forwardedRef
  ) => {
    const [input, setInput] = useState((value ?? '') as string)
    const previous = usePrevious(value)
    const ref = useRef<HTMLTextAreaElement>(null)

    const a11yId = useId()
    const count = amountOfChars(input)
    const overTheLimit = count > maxCountLetter

    useEffect(() => {
      const textarea = ref.current
      if (!textarea) return

      if (previous !== value) {
        adjustHeight(textarea, maxHeight)
      }
    }, [maxHeight, previous, value])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
      onChange?.(e)
    }

    return (
      <div className={s.paper}>
        <label htmlFor={a11yId}>{label}</label>
        <textarea
          aria-invalid={overTheLimit}
          readOnly={overTheLimit}
          ref={mergeRefs(forwardedRef, ref)}
          {...props}
          className={cc([s.textarea, className])}
          id={a11yId}
          onChange={handleChange}
          value={value}
        />
        <div className={s.footer}>
          <span>Tip</span>
          <span>{count}</span>
        </div>
      </div>
    )
  }
)
