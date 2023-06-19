import { array, object, string } from 'yup'

export const advantagesSchema = object({
  advantages: array()
    .of(object({ field: string() }))
    .required('Поле обязательно для заполнения'),
  checkbox: array().of(string()).required('Выберете хотя бы один пункт'),
  radio: string().required('Укажите подходящий пункт')
})
