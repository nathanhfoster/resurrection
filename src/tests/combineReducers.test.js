import { combineReducers, getReducerDefaultState } from '../utils'
import { DEFAULT_STATE, testReducer1, reducers } from './utils'

describe('combineReducers', () => {
  it('should initialize a reducer without an initial state prop', () => {
    const [state, reducer] = combineReducers(testReducer1)
    const expectedState = DEFAULT_STATE
    expect(state).toBe(expectedState)
    expect(getReducerDefaultState(reducer)).toBe(expectedState)
  })

  it('should combine multiple reducers and initialize their state', () => {
    const [state, reducer] = combineReducers(reducers)
    const expectedState = {
      testReducer1: DEFAULT_STATE,
      testReducer2: DEFAULT_STATE
    }
    expect(state).toMatchObject(expectedState)
    expect(getReducerDefaultState(reducer)).toMatchObject(expectedState)
  })
})
