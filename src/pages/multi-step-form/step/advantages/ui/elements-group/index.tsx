import { useFormContext } from 'react-hook-form'

import { toTitle } from '@/shared/lib/string'
import { Checkbox } from '@/shared/view/checkbox'
import { Radio } from '@/shared/view/radio'

import s from './index.module.css'

const COUNT_OF_ELEMENTS = 3

const COMPONENTS = {
  checkbox: Checkbox,
  radio: Radio
}

export interface ElementsProps {
  renderVariant: 'radio' | 'checkbox'
}

export function ElementsGroup({ renderVariant }: ElementsProps) {
  const { register } = useFormContext()
  const Component = COMPONENTS[renderVariant]
  const title = `${toTitle(renderVariant)} group`

  return (
    <div className={s.container}>
      <span className={s.title}>{title}</span>
      {Array.from({ length: COUNT_OF_ELEMENTS }, (_, index) => (
        <Component
          key={index}
          {...register(renderVariant)}
          label={String(index + 1)}
          value={String(index + 1)}
        />
      ))}
    </div>
  )
}
