import type { Fields } from '..'

export function preparePayload<T extends Fields>({
  advantages,
  checkbox,
  radio
}: T) {
  const bucket: Record<string, string | string[] | number[]> = {}

  bucket.advantages = advantages.map((v) => v.field)
  bucket.checkbox = checkbox.map((v) => Number.parseInt(v, 10))
  bucket.radio = radio

  return bucket
}
