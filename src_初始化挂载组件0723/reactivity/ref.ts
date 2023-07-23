import { haChange, isObject } from '../shared'
import { isTracking, trackEffect, triggerEffect } from './effect'
import { reactive } from './reactive'

class RefImpl {
  private _value: any
  public dep
  private _rawValue: any
  public _v__isRef = true
  constructor(value) {
    this._rawValue = value
    this._value = convert(value)

    this.dep = new Set()
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    if (haChange(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffect(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep)
  }
}

export const ref = (value) => {
  return new RefImpl(value)
}

export const isRef = (ref) => {
  return !!ref._v__isRef
}

export const unRef = (ref) => {
  return isRef(ref) ? ref.value : ref
}

export const proxyRefs = (objectWidthRefs) => {
  return new Proxy(objectWidthRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },

    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}
