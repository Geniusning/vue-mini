import { ShapeFlags } from '../shared/ShapeFlags'
import { isObject } from '../shared/index'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // 调用 patch，方便后续递归处理
  patch(vnode, container)
}

function patch(vnode, container) {
  // todo 判断vnode 是不是一个element
  // 是element 那么久应该处理element
  const { shapesFlag } = vnode
  if (shapesFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (shapesFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.type))
  const { props, children, shapesFlag } = vnode
  if (shapesFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapesFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }
  for (const key in props) {
    const val = props[key]
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }
  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(initialVnode, container) {
  const instance = createComponentInstance(initialVnode)
  setupComponent(instance)
  setupRenderEffect(instance, initialVnode, container)
}

function setupRenderEffect(instance: any, initialVnode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode

  patch(subTree, container)

  initialVnode.el = subTree.el
}
