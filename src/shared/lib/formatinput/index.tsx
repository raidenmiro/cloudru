/* eslint-disable default-case */
import type { FormEvent, KeyboardEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'

import { Input } from '@/shared/view/input'

import s from './index.module.css'

export interface FormattedInputProps {
  label: string
  value: string
  mask: string
  placeholder: string
  onChange(v: string): void
}

const MASK_CHARS = ['^', '_', '#', undefined]

export const defaultParser = (value: string | null | undefined): string => {
  if (value === null || value === undefined) {
    return ''
  }
  return value.replace(/[^A-ZА-Я0-9]/gi, '')
}

export const defaultFormatter = (value: string, mask: string): string => {
  const result = []
  for (let i = 0, m = 0; m < mask.length; ++m) {
    if (MASK_CHARS.includes(mask[m])) {
      if (i >= value.length) break
      result.push(value[i++])
    } else {
      result.push(mask[m])
    }
  }
  return result.join('')
}

const getStartPosition = (mask: string): number => {
  let startPos = 0
  while (!MASK_CHARS.includes(mask[startPos]) && startPos < mask.length) {
    startPos++
  }
  return startPos
}

const getValuePosition = (
  _value: string,
  mask: string,
  maskPos: number
): number => {
  let pos = 0
  for (let i = 0; i < maskPos; ++i) {
    if (MASK_CHARS.includes(mask[i])) {
      pos++
    }
  }
  return pos
}

const setCaret = (
  target: HTMLInputElement,
  pos: number,
  callback?: () => number
) => {
  requestAnimationFrame(() => {
    if (callback) {
      // eslint-disable-next-line no-param-reassign
      pos = callback()
    }
    target.setSelectionRange(pos, pos)
  })
}

const getMaskPosition = (
  _value: string,
  mask: string,
  valuePos: number
): number => {
  let pos = 0
  for (let i = 0; pos < mask.length && i < valuePos; ++pos) {
    if (MASK_CHARS.includes(mask[pos])) {
      i++
    }
  }
  return pos
}

export const FormattedInput = ({
  label,
  value,
  mask,
  placeholder,
  onChange
}: FormattedInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const formattedValue = defaultFormatter(value, mask)
  const id = useRef(Math.random().toString(36))

  const getPattern = useCallback(
    (value: string): string => {
      if (value.length === 0) {
        return ''
      }

      const maskChars = mask.split('').slice(0, value.length)
      maskChars.unshift('')
      const reStr = maskChars
        .join('\\')
        .replace(/\\#/g, '\\d')
        .replace(/\\\^/g, '[A-ZА-Я]')
        .replace(/\\_/g, '[a-zа-я]')

      return `^${reStr}$`
    },
    [mask]
  )

  const validate = useCallback(
    (value: string): boolean => {
      if (value.length === 0) {
        return true
      }

      const re = new RegExp(getPattern(value))

      if (re.test(value)) {
        return true
      }
      return false
    },
    [getPattern]
  )

  const handleInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement
      const value = target.value.slice(0, mask.length)
      const savePos = target.selectionStart || getStartPosition(mask)

      const parsedValue = defaultParser(value)
      onChange(parsedValue)

      if (savePos < value.length) {
        setCaret(target, savePos)
      }
    },
    [mask, onChange]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const caret = ref.current?.selectionStart || getStartPosition(mask)
      const target = e.target as HTMLInputElement

      switch (e.key) {
        case 'ArrowUp':
        case 'Home':
        case 'Escape':
          setCaret(target, getStartPosition(mask))
          e.preventDefault()
          e.stopPropagation()
          break

        case 'Backspace': {
          const valuePos = getValuePosition(value, mask, caret)
          const newValue = `${value.slice(
            0,
            Math.max(0, valuePos - 1)
          )}${value.slice(valuePos, value.length)}`
          let maskPos = getMaskPosition(newValue, mask, valuePos)

          maskPos = Math.max(maskPos - 1, getStartPosition(mask))
          onChange(newValue)
          setCaret(target, maskPos)
          e.preventDefault()
          e.stopPropagation()
          break
        }

        case 'Delete': {
          const valuePos = getValuePosition(value, mask, caret)
          const newValue = `${value.slice(
            0,
            Math.max(0, valuePos)
          )}${value.slice(valuePos + 1, value.length)}`

          onChange(newValue)
          setCaret(target, caret)
          e.preventDefault()
          e.stopPropagation()
          break
        }
      }
    },
    [mask, onChange, value]
  )

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLInputElement
      setCaret(target, 0, () => {
        const start = getStartPosition(mask)
        if ((target.selectionStart || 0) < start) {
          return start
        }
        return target.selectionStart || 0
      })
    },
    [mask]
  )

  useEffect(() => {
    validate(formattedValue)
  }, [formattedValue, validate])

  return (
    <div>
      <div className={s.container}>
        <Input
          label={label}
          tabIndex={-1}
          className={s.input}
          value={formattedValue.concat(
            placeholder.slice(formattedValue.length)
          )}
          onChange={() => {}}
        />
        <div className={s.hidden}>
          <Input
            label=""
            id={id.current}
            ref={ref}
            value={formattedValue}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
          />
        </div>
      </div>
    </div>
  )
}
