import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { sendForm } from '@/shared/api'
import { useLayoutProps } from '@/shared/layouts/stepform/context'
import { Button } from '@/shared/view/button'

import s from './index.module.css'
import { AdvantagesFields, genStaticFields } from './ui/advantages-group'
import { ElementsGroup } from './ui/elements-group'

export const Advantages = () => {
  const { nextPage, prevPage } = useLayoutProps()
  const [loading, setLoading] = useState(false)
  const methods = useForm({ defaultValues: genStaticFields() })

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true)
      await sendForm(data)
      nextPage()
    } finally {
      setLoading(false)
    }
  })

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={onSubmit}>
        <fieldset className={s.fieldset}>
          <legend>Advantages</legend>

          <div className={s.advantages}>
            <AdvantagesFields />
          </div>

          <div className={s.elements}>
            <ElementsGroup renderVariant="checkbox" />
            <ElementsGroup renderVariant="radio" />
          </div>
        </fieldset>
        <footer className={s.footer}>
          <Button kind="outline" onClick={prevPage} type="button">
            Back
          </Button>
          <Button disabled={loading} loading={loading} type="submit">
            Далее
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
Advantages.displayName = 'Advantages.Step'
