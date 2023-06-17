import { useCallback, useState } from 'react'

export function useToggle(initialState: boolean) {
  const [value, setValue] = useState(() => initialState)

  const toggle = useCallback(() => {
    setValue((value) => !value)
  }, [])

  const setTruthy = useCallback(() => {
    setValue(true)
  }, [])

  const setFalsy = useCallback(() => {
    setValue(false)
  }, [])

  return [value, { setFalsy, setTruthy }, toggle] as const
}
