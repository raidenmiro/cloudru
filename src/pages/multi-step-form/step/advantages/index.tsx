import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { sendForm } from '@/shared/api'
import { useLayoutProps } from '@/shared/layouts/stepform/context'
import { usePersistForm } from '@/shared/lib/hooks/use-persist-form'
import { Button } from '@/shared/view/button'

import s from './index.module.css'
import { preparePayload } from './lib'
import { advantagesSchema } from './schema'
import { AdvantagesFields, genStaticFields } from './ui/advantages-group'
import { ElementsGroup } from './ui/elements-group'

export interface Fields {
  advantages: Array<{ field: string }>
  checkbox: string[]
  radio: string
}

export const Advantages = () => {
  const { nextPage, prevPage } = useLayoutProps()
  const [loading, setLoading] = useState(false)

  const methods = useForm<Fields>({
    defaultValues: genStaticFields(),
    resolver: yupResolver(advantagesSchema)
  })

  usePersistForm('advantages', methods)

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true)
      const payload = preparePayload(data)
      await sendForm(payload)
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
          <Button
            className={s.button}
            kind="outline"
            onClick={prevPage}
            type="button">
            Back
          </Button>
          <Button
            className={s.button}
            disabled={loading}
            loading={loading}
            type="submit">
            Далее
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
Advantages.displayName = 'Advantages.Step'
