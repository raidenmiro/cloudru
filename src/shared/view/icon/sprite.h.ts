export interface SpritesMap {
  sprite:
    | 'arrow-down'
    | 'close'
    | 'dot'
    | 'failure'
    | 'folder'
    | 'plus'
    | 'success'
    | 'trash'
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  sprite: [
    'arrow-down',
    'close',
    'dot',
    'failure',
    'folder',
    'plus',
    'success',
    'trash'
  ]
}
