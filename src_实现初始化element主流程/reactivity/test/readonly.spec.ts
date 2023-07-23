import { readonly, isReadonly, isProxy } from '../reactive'
describe('readonly', (): void => {
  it('happy path', () => {
    const origin = { foo: 1, bar: { name: 'bar' } }
    const observal = readonly(origin)
    expect(isReadonly(observal)).toBe(true)
    expect(isReadonly(observal.bar)).toBe(true)
    expect(isReadonly(origin)).toBe(false)
    expect(observal).not.toBe(origin)
    expect(observal.foo).toBe(1)

    expect(isProxy(observal)).toBe(true)
  })

  it('when set called', () => {
    console.warn = jest.fn()
    const user = readonly({
      age: 11
    })

    user.age = 12

    expect(console.warn).toBeCalled()
  })
})
