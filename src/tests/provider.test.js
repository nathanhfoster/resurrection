import React from 'react'
import { render } from '@testing-library/react'
import App from '../../example/src/App'
import SomeProviderChild from '../../example/src/SomeProviderChild'

let props
let wrapper
describe('App', () => {
  beforeEach(() => {
    props = {}
    wrapper = render(
      <App>
        <SomeProviderChild />
      </App>
    )
  })

  it('should mount', () => {
    expect(wrapper).toBeDefined()
  })
})
