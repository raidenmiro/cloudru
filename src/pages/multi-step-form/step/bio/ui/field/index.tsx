import type { ReactNode } from 'react'

import s from './index.module.css'

export const FieldControl = ({ children }: { children: ReactNode }) => {
  return <div className={s.group}>{children}</div>
}
