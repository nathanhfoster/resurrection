import isFunction from './isFunction'

function createThunk(extraArgument) {
  return (dispatch, getState) => next => action => {
    if (isFunction(action)) {
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

export default createThunk
