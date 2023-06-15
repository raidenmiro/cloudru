import { TextArea } from '@/shared/view/textarea'

export const AboutMe = () => {
  return (
    <form>
      <TextArea label="About" maxHeight={130} maxLength={200} />
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
