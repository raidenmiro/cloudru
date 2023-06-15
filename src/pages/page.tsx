import { useEffect, useState } from 'react'
import { SignUpPage } from './signup/page'
import { Started } from './started/page'
import { router } from './router'

export const Page = () => {
  const [route, setRoute] = useState(() => router.get())

  useEffect(() => {
    const unsub = router.listen((path) => {
      setRoute(path)
    })
    return () => unsub()
  }, [])

  if (route === 'started') {
    return <Started />
  }

  return <SignUpPage />
}
