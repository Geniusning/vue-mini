import { ReactiveEffect } from './effect'

class ComputedRefImpl {
  private _getter: any
  private _dirst: boolean = true
  private _value: any
  private _effect: ReactiveEffect
  constructor(getter) {
    this._getter = getter

    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirst) {
        this._dirst = true
      }
    })
  }

  get value() {
    // 当依赖的响应式对象的值发生改变的时候
    // effect
    if (this._dirst) {
      this._dirst = false
      this._value = this._effect.run()
    }

    return this._value
  }
}

export const computed = (getter) => {
  return new ComputedRefImpl(getter)
}
