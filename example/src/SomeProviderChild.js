import React from 'react'
import { connect } from 'resurrection'

const SomeProviderChild = ({ someKeyFromMyStore }) => (
  <div>{someKeyFromMyStore}</div>
)

const mapStateToProps = ({ someKeyFromMyStore }) => ({ someKeyFromMyStore })

export default connect(mapStateToProps)(SomeProviderChild)
