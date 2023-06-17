/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import type { SetFieldValue, UseFormWatch } from 'react-hook-form'

import { debounce } from '../debounce'
import { LS } from '../storage'

export function usePersistForm<TData extends Record<string, any>>(
  key: string,
  opts: {
    setValue: SetFieldValue<TData>
    watch: UseFormWatch<TData>
  }
) {
  const { setValue, watch } = opts

  const watchValues = watch()

  useEffect(() => {
    const values = LS.get<TData>(key)

    if (values) {
      Object.keys(values).forEach((key) => {
        if (typeof values === 'object' && key in values) {
          setValue(key, values[key], {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false
          })
        }
      })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    const run = debounce(500, () => {
      LS.set(key, watchValues)
    })

    run()
  }, [key, opts, watchValues])
}
