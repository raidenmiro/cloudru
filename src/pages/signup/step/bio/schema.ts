import { mixed, object, string } from 'yup'

enum Sex {
  Man = 'man',
  Woman = 'woman'
}

export const bioSchema = object({
  nickname: string().min(2).max(30).required(),
  name: string().min(2).max(50).required(),
  surname: string().min(2).max(50),
  sex: mixed<Sex>().oneOf(Object.values(Sex))
})
