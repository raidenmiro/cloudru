/* eslint-disable no-bitwise */

/**
 * build from path string RegExp route
 */
export const createPattern = (value: string) => {
  const pattern = value
    .replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
    .replace(/\/\\:\w+\\\?/g, '/?([^/]*)')
    .replace(/\/\\:\w+/g, '/([^/]+)')

  return new RegExp('^' + pattern + '$', 'i')
}

/**
 *  match routes observer
 */
export const createRouter = (routes: Record<string, () => string>) => {
  const keys = Object.keys(routes)
  const matcher: Array<{ match: RegExp; name: string }> = []
  const listeners: Array<(path: string) => void> = []

  for (const key of keys) {
    matcher.push({ match: createPattern(routes[key]()), name: key })
  }

  const parse = (path: string) => {
    for (const { match, name } of matcher) {
      if (match.test(path)) {
        return name
      }
    }
  }

  const notify = (path: string) => {
    listeners.forEach((cb) => cb(path))
  }

  const listener = () => {
    let parsed = parse(window.location.pathname)

    if (!parsed) {
      parsed = window.location.pathname
    }

    notify(parsed)
  }

  return {
    back() {
      history.back()
    },
    go(path: string) {
      history.pushState(null, '', path)
    },
    listen(cb: (path: string) => void) {
      const currentPathname = window.location.pathname
      const parsedPathname = parse(currentPathname)

      listeners.push(cb)

      if (parsedPathname) {
        cb(parsedPathname)
      }

      window.addEventListener('popstate', listener)
      return () => {
        window.removeEventListener('popstate', listener)

        const idx = listeners.indexOf(cb)
        if (~idx) {
          listeners.splice(idx, 1)
        }
      }
    }
  }
}
