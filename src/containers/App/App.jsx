// Deps
import React from 'react';
import { connect } from 'react-redux';

// Styles
// import reset from 'normalize.css';
import reset from 'ress';
import styles from '../../components/Global/global.css';

function App({ pushPath, children }) {
  return children;
}

export default connect(
  state => ({})
)(App);
