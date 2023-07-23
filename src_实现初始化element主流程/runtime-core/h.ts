import { createVnode } from './vnode'

export function h(type, props?, children?) {
  console.log('h')
  return createVnode(type, props, children)
}
