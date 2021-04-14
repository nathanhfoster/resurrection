import { actionTypes, combineReducers, getReducerDefaultState } from '..'
import {
  DEFAULT_STATE,
  testReducer1,
  reducers
} from '../../tests/provider.test'

describe('combineReducers', () => {
  it('Should return initial state and globabl reducer when initial state is defined', () => {
    const initialState = { key1: 'value1', key2: 'value2' }
    const [state, reducer] = combineReducers(reducers, initialState)
    const action = { type: actionTypes.PROBE_UNKNOWN_ACTION() }
    reducer(undefined, action)

    expect(state).toMatchObject(initialState)
    expect(reducer).toBeDefined()
  })

  it('Should initialize a reducer without an initial state prop', () => {
    const [state, reducer] = combineReducers(testReducer1)
    const expectedState = DEFAULT_STATE
    expect(state).toBe(expectedState)
    expect(getReducerDefaultState(reducer)).toBe(expectedState)
  })

  it('Should combine multiple reducers and initialize their state', () => {
    const [state, reducer] = combineReducers(reducers)
    const expectedState = {
      testReducer1: DEFAULT_STATE,
      testReducer2: DEFAULT_STATE
    }
    expect(state).toMatchObject(expectedState)
    expect(getReducerDefaultState(reducer)).toMatchObject(expectedState)
  })

  it('Should throw an error when a reducer is not a function', () => {
    const newReducers = { ...reducers, badReducer: 'badReducer' }
    expect(() => combineReducers(newReducers)).toThrowError(
      'badReducer is not a function!'
    )
  })
})
