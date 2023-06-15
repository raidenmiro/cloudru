/**
 * build from string RegExp route match
 *
 * @param value string
 * @returns RegExp
 */
export const createPattern = (value: string) => {
  const pattern = value
    .replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
    .replace(/\/\\:\w+\\\?/g, '/?([^/]*)')
    .replace(/\/\\:\w+/g, '/([^/]+)')

  return new RegExp('^' + pattern + '$', 'i')
}

/**
 * simplify match routes observer
 *
 * @param routes - Record of route name and function that returns route path
 */
export const createRouter = (routes: Record<string, () => string>) => {
  const keys = Object.keys(routes)
  const matcher: Array<{ name: string; match: RegExp }> = []
  const listeners: Array<(path: string) => void> = []

  for (const key of keys) {
    matcher.push({ name: key, match: createPattern(routes[key]()) })
  }

  let prev: string, current: string
  const parse = (path: string) => {
    if (prev !== path) {
      prev = path

      for (const { name, match } of matcher) {
        if (match.test(path)) {
          return name
        }
      }
    }
  }

  const notify = (path: string) => {
    current = path
    listeners.forEach((cb) => cb(path))
  }

  const listener = (_: PopStateEvent) => {
    const parsed = parse(window.location.pathname)

    if (parsed) {
      current = parsed
    }

    notify(current)
  }

  return {
    get() {
      return current
    },
    listen(cb: (path: string) => void) {
      const currentPathname = window.location.pathname
      const parsedPathname = parse(currentPathname)

      listeners.push(cb)

      if (parsedPathname) {
        current = parsedPathname
        cb(current)
      }

      window.addEventListener('popstate', listener)
      return () => {
        window.removeEventListener('popstate', listener)
        listeners.length = 0
      }
    },
    go(path: string) {
      history.pushState(null, '', path)
      notify(path)
    },
    back() {
      history.back()
    }
  }
}
