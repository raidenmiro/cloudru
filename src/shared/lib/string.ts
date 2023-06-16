export const amountOfChars = (s: string) =>
  s.trim().replace(/\s/g, '').split('').length
