/* eslint-disable perfectionist/sort-jsx-props */
import { Fragment, useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/shared/view/button'
import { Icon } from '@/shared/view/icon'
import { Input } from '@/shared/view/input'

import s from './index.module.css'

export function AdvantagesFields() {
  const { control, register } = useFormContext()

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'advantages'
  })

  const addOne = useCallback(() => {
    append({ field: '' })
  }, [append])

  return (
    <Fragment>
      <ul className={s.paper}>
        {fields.map((field, index) => (
          <li key={field.id} className={s.field}>
            <Input
              label=""
              paperClassName={s.input}
              variant="secondary"
              {...register(`advantages.${index}.field`)}
            />
            <button
              type="button"
              className={s.control}
              onClick={() => remove(index)}>
              <Icon className={s.icon} path="sprite/trash" />
            </button>
          </li>
        ))}
      </ul>
      <Button type="button" kind="outline" onClick={addOne}>
        <Icon path="sprite/plus" />
      </Button>
    </Fragment>
  )
}

export function genStaticFields() {
  return {
    advantages: Array.from({ length: 3 }, () => ({ field: '' }))
  }
}
