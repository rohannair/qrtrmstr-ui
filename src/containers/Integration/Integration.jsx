// Deps
import React, { Component, PropTypes } from 'react';
// import Cookies from 'cookies-js';
import { connect } from 'react-redux';

// Styles
import styles from './integration.css';

// Utils
import { merge } from 'lodash';

// Components
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';

import Button from '../../components/Button';

// Actions
import { sendAuthCredentials } from '../../actions/userActions';

class Integration extends Component {

  state = {};

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this._sendAuthCredentials();
  };

  render() {
    const { submitForm } = this.props;
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
    const { dispatch } = this.props
    const { state, code } = this.props.location.query;

    return dispatch(sendAuthCredentials( { userId: state, authCode: code } ));
    this.context.router.replace('/login');
    // TODO: Possible Redirect to the dashboard here after I dispatch the action so that the user doesn't realize
    // Problem may be subdomains
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
