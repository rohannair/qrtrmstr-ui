// Deps
import React, { Component, PropTypes } from 'react';
import Cookies from 'cookies-js';
import { connect } from 'react-redux';

// Utils
import { merge } from 'lodash';

// Components
import AppContainer from '../../components/Global/AppContainer';

import Login from '../../components/Login';
import UserList from '../../components/UserList';

// Actions
import { setTokenCookie, tryLogin, logOut } from '../../actions/loginActions';
import { getUsers } from '../../actions/actions';

class App extends Component {

  state = {
  };

  componentDidMount() {
    const { token, dispatch } = this.props;
    if (token) {

    } else if (Cookies.get('token')) {
      return this.props.dispatch(setTokenCookie(Cookies.get('token')));
    }
  };

  render() {
    const { token, users } = this.props;

    const mainScreen = !!token
      ? <UserList renderList={this._renderUserList} data={users}/>
      : <Login submitForm={this._submitForm}/>;

    return (
      <AppContainer logout={this._logout}>
        {mainScreen}
      </AppContainer>
    );
  };

  _logout = () => {
    const { dispatch } = this.props;
    return dispatch(logOut());
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

  _renderUserList = _ => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  }
};

function mapStateToProps(state) {
  const { token } = state.accountActions;
  const { users } = state.app;
  return {
    token,
    users
  };
}

export default connect(mapStateToProps)(App);
