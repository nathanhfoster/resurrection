# resurrection

> State management library that follows redux and redux-thunk architecture but uses React&#x27;s latest useContext and useReducer hooks.

[![NPM](https://img.shields.io/npm/v/resurrection.svg)](https://www.npmjs.com/package/resurrection) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save resurrection
```

## Usage

```jsx
// Higher Order Component (HOC)
import React from "react"
import { ContextProvider } from "resurrection"
import SomeProviderChild from "./SomeProviderChild"

const DEFAULT_STATE = {
  someKeyFromMyStore: "Hello World",
}

const someReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case "SOME_ACTION_TYPE":
      return { ...state, someKeyFromMyStore: payload }

    default:
      return state
  }
}

const SomeProvider = () => (
  /* rootReducer can be a single reducer function or an object of reducers */
  /* object of reducers example: const rootReducer = { someReducer, someOtherReducer} */
  <ContextProvider rootReducer={someReducer}>
    <SomeProviderChild />
  </ContextProvider>
)

export default SomeProvider
```

```jsx
// Child Component
import React, { Component } from "react"
import { connect } from "resurrection"

const mapStateToProps = ({ someKeyFromMyStore }) => ({
  somePropKey: someKeyFromMyStore,
})

const SomeProviderChild = ({ somePropKey }) => {
  return (
    <div>{`I recieved ${somePropKey} prop from my store through the connect API`}</div>
  )
}

export default connect(mapStateToProps)(SomeProviderChild)
```

## License

MIT © [strap8](https://github.com/strap8)
