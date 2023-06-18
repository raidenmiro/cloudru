/* eslint-disable no-bitwise */

import { useEffect, useState } from 'react'

/**
 * Создает RegExp из строки (путь)
 */
export const createPattern = (value: string) => {
  const pattern = value
    .replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
    .replace(/\/\\:\w+\\\?/g, '/?([^/]*)')
    .replace(/\/\\:\w+/g, '/([^/]+)')

  return new RegExp('^' + pattern + '$', 'i')
}

/**
 *  миниатюрная реализация простого роутера с observer
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
    const parsed = parse(window.location.pathname)

    if (parsed) {
      notify(parsed)
    }
  }

  return {
    go(path: string) {
      history.pushState(null, '', path)

      const parsedPathname = parse(path)
      if (parsedPathname) {
        notify(parsedPathname)
      }
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
        // битовый оператор для превращения -1 в 0
        if (~idx) {
          listeners.splice(idx, 1)
        }
      }
    }
  }
}

export function useRouter(router: ReturnType<typeof createRouter>) {
  // здесь мы могли использовать useSyncWithExternalStore
  const [route, setRoute] = useState('/')

  useEffect(() => {
    const unsub = router.listen((path) => {
      setRoute(path)
    })
    return () => unsub()
  }, [router])

  return route
}
