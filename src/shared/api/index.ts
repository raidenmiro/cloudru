import { request } from './adapter'

const BASE_URL = 'https://api.sbercloud.ru/content/v1/bootcamp/frontend'

export function sendInformation(form: FormData) {
  return request({
    path: BASE_URL,
    method: 'POST',
    body: form
  })
}
