import { array, object, string } from 'yup'

export const advantagesSchema = object({
  advantages: array()
    .of(object({ field: string() }))
    .required(),
  checkbox: array().of(string()).required(),
  radio: string().required()
})
