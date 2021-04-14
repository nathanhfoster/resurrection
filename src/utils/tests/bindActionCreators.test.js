import bindActionCreators from '../bindActionCreators'

let dispatch

describe('bindActionCreators', () => {
  beforeEach(() => {
    dispatch = jest.fn()
  })

  it('Should throw an error when mapDispatchToProps is not an object', () => {
    const mapDispatchToProps = () => true
    expect(() => bindActionCreators(mapDispatchToProps, dispatch)).toThrowError(
      'bindActionCreators expected an object or a function, instead received function.'
    )
  })

  it('Should throw an error when mapDispatchToProps is null', () => {
    const mapDispatchToProps = null
    expect(() => bindActionCreators(mapDispatchToProps, dispatch)).toThrowError(
      'bindActionCreators expected an object or a function, instead received null.'
    )
  })

  it('Should throw an error when mapDispatchToProps is not an object', () => {
    const someAction = { type: 'SOME_ACTION_TYPE' }
    const anotherAction = (payload) => (dispatchThunk) => {
      dispatchThunk({ type: 'SOME_OTHER_TYPE', payload })
    }
    const mapDispatchToProps = {
      someAction,
      anotherAction
    }
    const result = bindActionCreators(mapDispatchToProps, dispatch)
    Object.values(result).forEach((action) => action())
    expect(result).toBeDefined()
    expect(dispatch).toHaveBeenCalledTimes(2)
  })
})
