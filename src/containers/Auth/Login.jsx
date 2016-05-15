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
import { login, tryLogin, logOut } from '../../actions/loginActions';

class App extends Component {

  state = {
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const { token, dispatch } = this.props;
    if (token) {
    }

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
    const { token, users } = this.props;

    return (
      <div className="app-login">
        <Header />
        <div className="login-container">
          <Login submitForm={this._submitForm}/>
        </div>
        <Footer />
      </div>
    );
  };

  _submitForm = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let data = {};

    [...e.target]
    .filter(val => val.localName === 'input')
    .map(val => ({ [val.name]: val.value }))
    .forEach(val => data = merge(data, val));

    return dispatch(tryLogin(data));
  };

};

function mapStateToProps(state) {
  const { token } = state.accountActions;
  return {
    token
  };
}

export default connect(mapStateToProps)(App);
