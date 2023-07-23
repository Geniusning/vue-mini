import { extend } from '../shared'

let activeEffect
let shouldTrack

export class ReactiveEffect {
  private _fn: any
  deps = []
  active = true
  onStop?: () => void
  public scheduler: Function | undefined

  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const result = this._fn()
    shouldTrack = false
    return result
  }

  stop() {
    if (this.active) {
      clearupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function clearupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })

  effect.deps.length = 0
}

let targetMap = new Map()
export const track = function (target, key) {
  if (!isTracking()) return
  // target-key-dep
  let depsMap = targetMap.get(target)
  /** targetMap
   * {age:10}:map
   */
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  /** depsMap
   * age:  [ReactiveEffect1]
   */
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  trackEffect(dep)
}

export const trackEffect = (dep) => {
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export const trigger = function (target, key) {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  triggerEffect(deps)
}

export const triggerEffect = (deps) => {
  for (const effect of deps) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export const effect = (fn, options: any = {}) => {
  const _effect: any = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)
  _effect.onStop = options.onStop
  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
}

export function stop(runner) {
  runner.effect.stop()
}
