import React from 'react'
import { render, screen } from '@testing-library/react'
import { getByText } from '@testing-library/dom'
import App, { DEFAULT_STATE } from '../../example/src/App'
import SomeProviderChild from '../../example/src/SomeProviderChild'

let props
let wrapper
let treeA
describe('connect', () => {
  beforeEach(() => {
    props = {}
    treeA = document.createElement('div')
    wrapper = render(<App />, {
      baseElement: treeA
    })
  })

  it('should mount the App example', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render data from the store', async () => {
    const { container, getByText } = wrapper
    const text = getByText(/Hello World/i)
  //   expect(container.firstChild).toMatchInlineSnapshot(`
  //   <div>Hello World</div>
  // `)
    expect(text).toBeDefined()
  })
})
