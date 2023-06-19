import { object, string } from 'yup'

import { formatTel } from '@/shared/lib/string'

export const startedForm = object({
  email: string().email('Некорректная почта').required('Почта обязательна'),
  phone: string()
    .required('Номер телефона обязателен')
    .transform((v) => formatTel(v))
    .length(11, 'Некорректный номер телефона')
})
