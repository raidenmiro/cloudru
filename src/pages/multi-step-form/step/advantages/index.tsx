import { Button } from '@/shared/view/button'
import { Checkbox } from '@/shared/view/checkbox'
import { Radio } from '@/shared/view/radio'

import { AdvantagesFields } from './field-array'
import s from './index.module.css'

export const Advantages = () => {
  return (
    <form className={s.form}>
      <fieldset className={s.fieldset}>
        {/* <legend>Advantages</legend> */}
        <Radio label="kek" />
        <Checkbox label="kek" />
        <AdvantagesFields />
      </fieldset>
      <footer className={s.footer}>
        <Button kind="outline" type="button">
          Назад
        </Button>
        <Button>Далее</Button>
      </footer>
    </form>
  )
}
Advantages.displayName = 'Advantages.Step'
