import React from 'react';
import { connect } from 'resurrection';

const ChildComponent = ({ someKeyFromMyStore }) => <div>{someKeyFromMyStore}</div>;

const mapStateToProps = ({ someReducer: { someKeyFromMyStore } }) => ({ someKeyFromMyStore });

export default connect(mapStateToProps)(ChildComponent);
