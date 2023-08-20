import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
// @ts-ignore
window.self = null
export const App = {
  render() {
    // @ts-ignore
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log('click')
        },
        onmousedown() {
          console.log('mouseDown')
        }
      },
      [h('div', { class: 'red' }, this.msg), h(Foo, { count: 1 })]
    )
  },

  setup() {
    return {
      msg: 'world'
    }
  }
}
