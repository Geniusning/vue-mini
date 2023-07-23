import { isReactive, reactive, isProxy } from '../reactive'
describe('reactive', (): void => {
  it('happy path', () => {
    const origin = { foo: 1 }
    const observal = reactive(origin)
    expect(observal).not.toBe(origin)
    expect(observal.foo).toBe(1)

    expect(isReactive(observal)).toBe(true)
    expect(isReactive(origin)).toBe(false)
    expect(isProxy(observal)).toBe(true)
  })

  test('nested reactive', () => {
    const origin = {
      nested: {
        foo: 1
      },
      array: [{ bar: 2 }]
    }

    const observed = reactive(origin)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
