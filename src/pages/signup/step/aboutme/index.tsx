import { TextArea } from '@/shared/view/textarea'

export const AboutMe = () => {
  return (
    <form>
      <TextArea label="About" maxHeight={300} />
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
