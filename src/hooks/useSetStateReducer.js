import { useReducer } from 'react'
import { defaultReducer } from '../utils'

/**
 * Mimics React.Component this.state and this.setState
 * @param {ReducerState=} initializerArg - initial state of the reducer
 * @param {ReducerStateInitializer=} initializer - callback that initilizes the reducer's state
 * @returns {Array.<ReducerState, function(): ReducerState>} - the new useReducer hook
 */
const useSetStateReducer = (initializerArg = {}, initializer) =>
  useReducer(defaultReducer, initializerArg, initializer)

export default useSetStateReducer
