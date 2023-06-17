export interface Request {
  body?: unknown | null
  headers?: Record<string, string>
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
  path: string
  query?: Record<string, string>
}

export const request = async <Done = unknown>({
  method = 'GET',
  path,
  ...config
}: Request): Promise<Done> => {
  const body = config.body ? JSON.stringify(config.body) : undefined
  const query = config.query ? new URLSearchParams(config.query).toString() : ''

  const url = path.concat(query ? `?${query}` : '')

  const answer = await fetch(url, {
    body,
    method
  })

  if (!answer.ok) {
    throw new Error(answer.statusText)
  }

  return answer.json()
}
