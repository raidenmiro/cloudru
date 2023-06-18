import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/shared/view/checkbox'

const COUNT_OF_CHECKBOX = 3

export function CheckboxGroup() {
  const { register } = useFormContext()

  return (
    <div>
      <span>Checkbox group</span>
      <div>
        {Array.from({ length: COUNT_OF_CHECKBOX }, (_, index) => (
          <Checkbox
            {...register('checkbox')}
            key={index}
            label={String(index + 1)}
            value={String(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}
