import { array, mixed, object, string } from 'yup'

export const advantagesSchema = object({
  advantages: array().of(mixed()).required(),
  checkbox: array().of(string()).required(),
  radio: string().required()
})
