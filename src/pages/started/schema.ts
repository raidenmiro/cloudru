import { number, object, string } from 'yup'

export const startedForm = object({
  email: string().email(),
  phone: number()
})
