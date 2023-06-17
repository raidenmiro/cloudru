import { Icon } from '@/shared/view/icon'

import { data } from './data'
import s from './index.module.css'

export const Socials = () => (
  <ul className={s.socials}>
    {data.map((item) => (
      <li key={item.id}>
        <Icon path="sprite/folder" />
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.label}
        </a>
      </li>
    ))}
  </ul>
)
