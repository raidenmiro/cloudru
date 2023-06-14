export function adjustHeight(
  el: HTMLTextAreaElement,
  maxHeight: number | string
) {
  const prevAlignment = el.style.alignSelf
  const prevOverflow = el.style.overflow
  const max = unwrapCssProp(maxHeight)

  const isFirefox = 'MozAppearance' in el.style
  if (!isFirefox) {
    el.style.overflow = 'hidden'
  }

  el.style.alignSelf = 'start'
  el.style.height = 'auto'

  const computed = el.scrollHeight + (el.offsetHeight - el.clientHeight)

  el.style.height = `${Math.min(computed, max)}px`
  el.style.overflow = prevOverflow
  el.style.alignSelf = prevAlignment
}

export function unwrapCssProp(prop: number | string) {
  if (typeof prop === 'string') {
    // eslint-disable-next-line no-param-reassign
    prop = Number.parseInt(prop.slice(0, -2), 10)
  }

  return prop
}
