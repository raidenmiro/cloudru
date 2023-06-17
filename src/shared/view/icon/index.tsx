import type { CSSProperties, SVGProps } from 'react'

import type { SpritesMap } from './sprite.h'

export type SpriteKey = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`
}[keyof SpritesMap]

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  height?: number
  path: SpriteKey
  width?: number
}

export function Icon({
  className,
  height,
  path,
  viewBox,
  width,
  ...props
}: IconProps) {
  const [spriteName, iconName] = path.split('/')

  const styles = {
    display: 'inline-block',
    fill: 'currentColor',
    font: 'inherit',
    height: `${height}px`,
    userSelect: 'none',
    width: `${width}px`
  } satisfies CSSProperties

  return (
    <svg
      aria-hidden
      className={className}
      focusable="false"
      style={styles}
      viewBox={viewBox}
      {...props}>
      <use xlinkHref={`/sprite/${spriteName}.svg#${iconName}`} />
    </svg>
  )
}
