import { useWatchSubmit } from '@/shared/layouts/stepform/hooks'
import { TextArea } from '@/shared/view/textarea'
import { useCallback } from 'react'

export const AboutMe = () => {
  const watchButtonPress = useCallback(() => {
    console.log('watchButtonPress')
  }, [])

  useWatchSubmit(watchButtonPress)

  return (
    <form>
      <TextArea label="About" maxHeight={130} maxLength={200} />
    </form>
  )
}
AboutMe.displayName = 'AboutMe.Step'
