import { Input } from '@/shared/view/input'
import s from './index.module.css'
import { Icon } from '@/shared/view/icon'
import { Button } from '@/shared/view/button'

export const Advantages = () => {
  return (
    <form className={s.form}>
      <fieldset className={s.fieldset}>
        <legend>Advantages</legend>
        <AdvantageField nesting={1} />
        <Button kind="outline">
          <Icon path="sprite/plus" />
        </Button>
      </fieldset>
    </form>
  )
}
Advantages.displayName = 'Advantages.Step'

export function AdvantageField({ nesting }: { nesting: number }) {
  return (
    <div className={s.field}>
      <Input
        label=""
        variant="secondary"
        paperClassName={s.input}
        id={`field-advantages-${nesting}`}
      />
      <button type="button" className={s.control}>
        <Icon path="sprite/trash" />
      </button>
      <footer className={s.footer}>
        <Button kind="outline" type="button">
          Назад
        </Button>
        <Button>Далее</Button>
      </footer>
    </div>
  )
}
