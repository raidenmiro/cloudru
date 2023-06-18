import { useFormContext } from 'react-hook-form'

import { Radio } from '@/shared/view/radio'

const COUNT_OF_RADIO = 3

export function RadioGroup() {
  const { register } = useFormContext()

  return (
    <div>
      <span>Radio group</span>
      {Array.from({ length: COUNT_OF_RADIO }, (_, index) => (
        <Radio
          key={index}
          {...register('radio')}
          label={String(index + 1)}
          value={String(index + 1)}
        />
      ))}
    </div>
  )
}
