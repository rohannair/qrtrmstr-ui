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

// Actions
import { login, tryLogin, logout } from '../../actions/loginActions';

class App extends Component {

  state = {
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
    const { token, users, error } = this.props;

    return (
      <div className="app-login">
        <Header />
        <div className="login-container">
          <Login submitForm={this._submitForm} error={ error }/>
        </div>
        <Footer />
      </div>
    );
  };

  _submitForm = (data) => {
    const { dispatch } = this.props;
    return dispatch(tryLogin(data));
  };

};

function mapStateToProps(state) {
  const { token, error } = state.accountActions;
  return {
    token,
    error
  };
}

export default connect(mapStateToProps)(App);
