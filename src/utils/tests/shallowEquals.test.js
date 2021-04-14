import shallowEquals from '../shallowEquals'

describe('shallowEquals', () => {
  it('Should return false when two objects have different key lengths', () => {
    const a = { key1: false }
    const b = { ...a, key2: true }
    const result = shallowEquals(a, b)
    expect(result).toBe(false)
  })

  it('Should return false when an object is not comparable', () => {
    const a = { key1: false }
    const b = null
    const result = shallowEquals(a, b)
    expect(result).toBe(false)
  })

  it('Should return true when an compared object keys are NaN', () => {
    const a = { key1: NaN }
    const b = { key1: NaN }
    const result = shallowEquals(a, b)
    expect(result).toBe(true)
  })
})
