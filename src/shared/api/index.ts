import { request } from './adapter'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export interface FormAnswer {
  message: string
  status: 'success' | 'error'
}

export function sendForm<P extends Record<string, unknown>>(form: P) {
  return request<FormAnswer>({
    body: JSON.stringify(form),
    method: 'POST',
    path: BASE_URL
  })
}
