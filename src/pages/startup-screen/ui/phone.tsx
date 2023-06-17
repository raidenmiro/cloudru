import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useState } from 'react'

import { FormattedInput } from '@/shared/lib/formatinput'

type InputProps = ComponentPropsWithoutRef<'input'>

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [value, setValue] = useState('')

    return (
      <FormattedInput
        ref={ref}
        {...props}
        label="Номер телефона"
        mask="+# (###) ### ## ##"
        name="phone"
        onChangeValue={setValue}
        placeholder="+7 (999) 999 99 99"
        value={value}
      />
    )
  }
)
