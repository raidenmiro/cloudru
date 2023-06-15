export const LS = {
  get<Done>(key: string): Done | null {
    const value = localStorage.getItem(key)
    if (!value) return null
    return JSON.parse(value)
  },
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  delete(key: string) {
    localStorage.removeItem(key)
  }
}
