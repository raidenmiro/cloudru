export interface SpritesMap {
  sprite: 'arrow-down' | 'folder' | 'plus' | 'trash'
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  sprite: ['arrow-down', 'folder', 'plus', 'trash']
}
