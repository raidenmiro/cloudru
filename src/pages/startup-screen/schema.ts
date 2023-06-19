import { object, string } from 'yup'

export const startedForm = object({
  email: string().email('Некорректная почта').required('Почта обязательна'),
  phone: string().required('Номер телефона обязателен')
})
