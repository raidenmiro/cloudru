/* eslint-disable default-case */
import type {
  ComponentPropsWithoutRef,
  FormEvent,
  KeyboardEvent,
  MouseEvent
} from 'react'
import { forwardRef, useCallback, useEffect, useId, useRef } from 'react'

import { Input } from '@/shared/view/input'

import { mergeRefs } from '../merge-refs'
import s from './index.module.css'

type BaseProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'name' | 'size'
>

export interface FormattedInputProps extends BaseProps {
  label: string
  mask: string
  name: string
  onChangeValue(v: string): void
  placeholder: string
  value: string
}

const MASK_CHARS = ['^', '_', '#', undefined]
const NOOP = () => {}

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

export const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  (
    {
      label,
      mask,
      name,
      onChange,
      onChangeValue,
      placeholder,
      value,
      ...props
    },
    forwardedRef
  ) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const formattedValue = defaultFormatter(value, mask)
    const id = useId()

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
        onChangeValue(parsedValue)

        if (savePos < value.length) {
          setCaret(target, savePos)
        }
      },
      [mask, onChangeValue]
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
            onChangeValue(newValue)
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

            onChangeValue(newValue)
            setCaret(target, caret)
            e.preventDefault()
            e.stopPropagation()
            break
          }
        }
      },
      [mask, onChangeValue, value]
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
            className={s.input}
            label={label}
            onChange={NOOP}
            tabIndex={-1}
            value={formattedValue.concat(
              placeholder.slice(formattedValue.length)
            )}
          />
          <div className={s.hidden}>
            <Input
              id={id}
              label=""
              name={name}
              onChange={onChange}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
              ref={mergeRefs(ref, forwardedRef)}
              value={formattedValue}
              {...props}
            />
          </div>
        </div>
      </div>
    )
  }
)
FormattedInput.displayName = 'FormattedInput'
