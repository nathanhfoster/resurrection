import { ReducerStateType, ReducerStateInitializerType } from 'types';

/**
 * Default initializer for a reducer
 * @param {ReducerStateType} stateOrProps - State or props
 * @returns {ReducerStateType}
 */
const defaultInitializer: ReducerStateInitializerType = (stateOrProps) => stateOrProps;

export default defaultInitializer;
