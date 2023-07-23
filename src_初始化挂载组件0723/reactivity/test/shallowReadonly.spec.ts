import { isReadonly, shallowReadonly } from '../reactive'

describe('shallowReadonly', (): void => {
  test('should not make non-reactive propertites reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })

  it('should call console.warn when setw', () => {
    console.warn = jest.fn()
    const user = shallowReadonly({
      age: 11
    })

    user.age = 12

    expect(console.warn).toBeCalled()
  })
})
