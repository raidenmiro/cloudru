import { mixed, object, string } from 'yup'

enum Sex {
  Man = 'man',
  Woman = 'woman'
}

export const bioSchema = object({
  name: string()
    .min(2, 'Минимальное количество символов 2')
    .max(50, 'Максимальное количество символов 50')
    .required('Обязательное поле')
    .matches(/[a-z]/i, 'Разрешены только буквы'),
  nickname: string()
    .min(2, 'Минимальное количество символов 2')
    .max(30, 'Максимальное количество символов 30')
    .required('Обязательное поле')
    .matches(/^[a-z0-9]/i, 'Спец символы запрещены в данном поле'),
  sex: mixed<Sex>().oneOf(Object.values(Sex)),
  surname: string()
    .min(2, 'Минимальное количество символов 2')
    .max(50, 'Максимальное количество символов 50')
    .required('Обязательное поле')
    .matches(/[a-z]/i, 'Разрешены только буквы')
})
