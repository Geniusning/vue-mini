import { ShapeFlags } from '../shared/ShapeFlags'

export function createVnode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapesFlag: getShapeFlag(type)
  }

  // handle children
  if (typeof children === 'string') {
    vnode.shapesFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapesFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  return vnode
}

function getShapeFlag(type) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}
