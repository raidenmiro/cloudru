/* eslint-disable perfectionist/sort-jsx-props */
import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'
import { Input } from '@/shared/view/input'

import s from './index.module.css'

export function AdvantagesFields() {
  const { control, register } = useForm()

  const { append, fields } = useFieldArray({
    control,
    name: 'field-advantages'
  })

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className={s.field}>
          <Input
            id={`field-advantages-${index}`}
            label=""
            paperClassName={s.input}
            variant="secondary"
            {...register(`'field-advantages-${index}`)}
          />
          <button className={s.control} type="button">
            <Icon path="sprite/trash" />
          </button>
        </div>
      ))}
      <Button
        kind="outline"
        onClick={() =>
          append({
            name: 'bill'
          })
        }>
        <Icon path="sprite/plus" />
      </Button>
    </>
  )
}
