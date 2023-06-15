import { useWatchSubmit } from '@/shared/layouts/stepform/hooks'
import { Input } from '@/shared/view/input'
import { useCallback } from 'react'

export const Advantages = () => {
  const watchButtonPress = useCallback(() => {
    console.log('watchButtonPress')
  }, [])

  useWatchSubmit(watchButtonPress)

  return (
    <form>
      <fieldset>
        <legend>Advantages</legend>

        <Input label="" />

        <input type="radio" id="sasquatch" name="monster" value="S" />
        <label htmlFor="sasquatch">Sasquatch</label>

        <input type="radio" id="mothman" name="monster" value="M" />
        <label htmlFor="mothman">Mothman</label>
      </fieldset>
    </form>
  )
}
Advantages.displayName = 'Advantages.Step'
