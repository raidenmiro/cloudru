import { mixed, object, string } from 'yup'

enum Sex {
  Man = 'man',
  Woman = 'woman'
}

export const bioSchema = object({
  name: string()
    .min(2)
    .max(50)
    .required()
    .matches(/[a-z]/i, 'Allow only letters'),
  nickname: string()
    .min(2)
    .max(30)
    .required()
    .matches(/^[a-z0-9]/i, 'Allow only letters and numbers'),
  sex: mixed<Sex>().oneOf(Object.values(Sex)),
  surname: string()
    .min(2)
    .max(50)
    .required()
    .matches(/[a-z]/i, 'Allow only letters')
})
