import { object, string } from 'yup'

export const startedForm = object({
  email: string().email('Email is not valid').required('Email is required'),
  phone: string().required('Phone is required')
})
