import { render } from './renderer'
import { createVnode } from './vnode'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // first Vnode
      // component -> vnode
      // 所有的逻辑操作都会基于 vnode 做处理

      const vnode = createVnode(rootComponent)
      render(vnode, rootContainer)
    }
  }
}
