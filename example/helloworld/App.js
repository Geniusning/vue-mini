import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {
  render() {
    return h(
      'div',
      {
        id: 'root'
      },
      // 'hi,i am coder',
      [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'i am blue')]
    )
  },

  setup() {
    return {
      msg: 'world'
    }
  }
}
