import { useEffect, useState } from 'react'

import { router } from './router'
import { SignUpPage } from './signup/page'
import { Started } from './started/page'

export const Page = () => {
  const [route, setRoute] = useState('/')

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
