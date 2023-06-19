import { object, string } from 'yup'

export const aboutMeSchema = object({
  aboutme: string().max(200).required('Заполните поле "о себе"')
})
