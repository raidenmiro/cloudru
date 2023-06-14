import { Input } from '@/shared/view/input'

export const Advantages = () => {
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
