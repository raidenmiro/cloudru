export function debounce(ms: number, cb: (...args: unknown[]) => void) {
  let timeout: number
  return (...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => cb(...args), ms)
  }
}
