import { useFieldArray, useForm } from 'react-hook-form'
import s from './index.module.css'
import { Input } from '@/shared/view/input'
import { Icon } from '@/shared/view/icon'
import { Button } from '@/shared/view/button'

const nextId = () => {
  let id = 0
  return () => ++id
}

const id = nextId()

export function AdvantagesFields() {
  const { register, control } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'field-advantages'
  })

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className={s.field}>
          <Input
            label=""
            variant="secondary"
            paperClassName={s.input}
            id={`field-advantages-${index}`}
            {...register(`'field-advantages-${index}`)}
          />
          <button type="button" className={s.control}>
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
