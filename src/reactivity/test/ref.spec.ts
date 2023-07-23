import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, proxyRefs, ref, unRef } from '../ref'

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let call = 0
    effect(() => {
      call++
      dummy = a.value
    })
    expect(call).toBe(1)
    expect(dummy).toBe(1)

    a.value = 2
    expect(call).toBe(2)
    expect(dummy).toBe(2)

    // same value should not trigger
    a.value = 2
    expect(call).toBe(2)
    expect(dummy).toBe(2)
  })

  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  it('isRef', () => {
    const a = ref(1)
    const user = reactive({
      user: 'liun'
    })
    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(user)).toBe(false)
  })

  it('unRef', () => {
    const a = ref(1)
    expect(unRef(a)).toBe(1)
    expect(unRef(1)).toBe(1)
  })

  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'liuning'
    }

    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('liuning')

    proxyUser.age = 20
    expect(user.age.value).toBe(20)
    expect(proxyUser.age).toBe(20)

    proxyUser.age = ref(30)
    expect(user.age.value).toBe(30)
    expect(proxyUser.age).toBe(30)
  })
})