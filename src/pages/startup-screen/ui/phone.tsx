import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useState } from 'react'

import { FormattedInput } from '@/shared/lib/formatinput'
import { formatTel } from '@/shared/lib/string'

type InputProps = ComponentPropsWithoutRef<'input'>

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  ({ value, ...props }, ref) => {
    const [input, setInput] = useState(() => {
      if (value) return formatTel(value as string)
      return ''
    })

    return (
      <FormattedInput
        ref={ref}
        {...props}
        label="Номер телефона"
        mask="+# (###) ### ## ##"
        onChangeValue={setInput}
        placeholder="+7 (999) 999 99 99"
        value={input}
      />
    )
  }
)
