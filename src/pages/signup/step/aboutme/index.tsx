import { Button } from '@/shared/view/button'
import { TextArea } from '@/shared/view/textarea'
import s from './index.module.css'

export const AboutMe = () => {
  return (
    <form>
      <TextArea label="About" maxHeight={130} maxLength={200} />
      <footer className={s.footer}>
        <Button kind="outline" type="button">
          Назад
        </Button>
        <Button>Далее</Button>
      </footer>
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
