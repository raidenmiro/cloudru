export function debounce<Args extends unknown[]>(
  ms: number,
  cb: (...args: Args) => void
) {
  let timeout: number
  return (...args: Args) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      cb(...args)
    }, ms)
  }
}
