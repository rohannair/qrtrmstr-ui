// Deps
import React, { Component, PropTypes } from 'react';
import Cookies from 'cookies-js';
import { connect } from 'react-redux';

// Styles
import styles from './login.css';

// Utils
import { merge } from 'lodash';

// Components
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import Login from '../../components/Login';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';

// Actions
import { login, tryLogin, logout, sendForgotPasswordEmail } from '../../actions/loginActions';

class App extends Component {

  state = {
    visibleModal: null,
    modalData: {}
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const { dispatch } = this.props;

    if (this.props.route.path === 'logout') {
      dispatch(logout());
      this.context.router.replace('/');
    }
  };

  componentDidMount() {
    const { token, dispatch } = this.props;
    if (Cookies.get('token')) {
      return dispatch(login(Cookies.get('token'), true));
    }
  };

  componentDidUpdate = () => {
    const { token, location } = this.props;
    if (token) {
      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname);
      } else {
        this.context.router.replace('/');
      }
    }
  }

  render() {
    const { token, users, error, message, resetPasswordMessage } = this.props;

    const { visibleModal } = this.state;

    const forgotPasswordModal = visibleModal === 'forgotPassword'
    ? <ForgotPasswordModal
        closeModal={ this._closeModal }
        modalData={ this.state.modalData }
        sendEmail={ this._sendForgotPasswordEmail }
      />
    : null;

    return (
      <div className="app-login">
        <Header />
        <div className="login-container">
          <Login
            submitForm={this._submitForm}
            showForgotPasswordModal={ this._showForgotPasswordModal }
            error={ error }
            message={ message || resetPasswordMessage }
          />
        </div>
        { forgotPasswordModal }
        <Footer />
      </div>
    );
  };

  _closeModal = () => this.setState({ visibleModal: null, modalData: {} });
  _openModal = (visibleModal) => {
    this.setState({
      visibleModal,
      modalData: {
        email: ''
      }
    });
  };

  _submitForm = (data) => {
    const { dispatch } = this.props;
    return dispatch(tryLogin(data));
  };

  _showForgotPasswordModal = () => {
    this._openModal('forgotPassword')
  };

  _sendForgotPasswordEmail = (email) => {
    const { dispatch } = this.props;

    const forgotPasswordEmailParams = {
      email,
      emailTemplate: 'forgotPasswordEmail'
    };

    return dispatch(sendForgotPasswordEmail(forgotPasswordEmailParams));
  };

};

function mapStateToProps(state) {
  const { token, error, message } = state.accountActions;
  const resetPasswordMessage = state.app.message;
  return {
    token,
    error,
    message,
    resetPasswordMessage
  };
}

export default connect(mapStateToProps)(App);
