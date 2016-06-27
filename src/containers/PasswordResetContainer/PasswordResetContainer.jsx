// Deps
import React, { Component, PropTypes } from 'react';
import Cookies from 'cookies-js';
import { connect } from 'react-redux';

// Styles
import styles from './passwordResetContainer.css';

// Utils
import { merge } from 'lodash';

// Components
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import PasswordReset from '../../components/PasswordReset';

// Actions
import { resetPassword } from '../../actions/userActions';

class PasswordResetContainer extends Component {

  state = {};

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.message.length > 0) this.context.router.replace('/login');
  };

  render() {
    const { errorMessage, message } = this.props;

    return (
      <div className="app-login">
        <Header />
        <div className="login-container">
          <PasswordReset
            submitForm={this._submitForm}
            error={ errorMessage }
            message={ message }
          />
        </div>
        <Footer />
      </div>
    );
  };

  _submitForm = (data) => {
    const { dispatch } = this.props;
    const userId = this.props.routeParams.userId;
    return dispatch(resetPassword(data, userId));
  };

};

function mapStateToProps(state) {
  const { errorMessage, message } = state.app;
  return {
    errorMessage,
    message
  };
}

export default connect(mapStateToProps)(PasswordResetContainer);
