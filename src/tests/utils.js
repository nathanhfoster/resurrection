export const DEFAULT_STATE = {
  someKeyFromMyStore: 'Hello World'
}

export const testReducer1 = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SOME_ACTION_TYPE_1':
      return { ...state, someKeyFromMyStore: payload }

    default:
      return state
  }
}

export const testReducer2 = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SOME_ACTION_TYPE_2':
      return { ...state, someKeyFromMyStore: payload }

    default:
      return state
  }
}

export const reducers = { testReducer1, testReducer2 }
