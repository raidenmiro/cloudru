import { mixed, object, string } from 'yup'

enum Sex {
  Man = 'man',
  Woman = 'woman'
}

export const bioSchema = object({
  name: string().min(2).max(50).required(),
  nickname: string().min(2).max(30).required(),
  sex: mixed<Sex>().oneOf(Object.values(Sex)),
  surname: string().min(2).max(50)
})
