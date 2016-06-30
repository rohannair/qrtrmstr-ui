// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Styles
import styles from './integration.css';

// Components
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';

import Button from '../../components/Button';

// Actions
import { sendAuthCredentials, removeAuthLink } from '../../actions/userActions';

class Integration extends Component {

  state = {};

  componentWillMount() {
    this._sendAuthCredentials();
  };

  render() {
    const errorEl = this.props.error
    ? <Alert danger>{`ERROR: ${this.props.error}`}</Alert>
    : null;

    const messageEl = this.props.message
    ? <Alert success>{`SUCCESS: ${this.props.message}`}</Alert>
    : null;

    return (
      <div className="app-login">
        <Header />
        <div className="login-container">
          <div className="errorContainer">{ errorEl }</div>
          <div className="errorContainer">{ messageEl }</div>
          <p>Integration was successful</p>
          <p>You can close this tab and return to the app</p>
        </div>
        <Footer />
      </div>
    );
  };

  _sendAuthCredentials = () => {
    const { dispatch } = this.props;
    const { state, code } = this.props.location.query;
    console.log('Here');
    debugger;
    dispatch(removeAuthLink());
    return dispatch(sendAuthCredentials({ userId: state, authCode: code }, this.props.routeParams.company));
  };

};

function mapStateToProps(state) {
  const { errorMessage, message } = state.app;
  return {
    errorMessage,
    message
  };
}

export default connect(mapStateToProps)(Integration);
