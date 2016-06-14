import Cookies from 'cookies-js';
import { has } from 'lodash';
import { logout } from '../actions/loginActions';

const utils = {
  hasToken: (store) => {
    if (has(store, 'token') || Cookies.get('token')) {
      return true;
    }
    return false;
  },

  requireAuth: (nextState, replace) => {
    if (!utils.hasToken()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  },

  checkAuth: (nextState, replace) => {
    if (utils.hasToken()) {
      replace({
        pathname: '/'
      });
    }
  },

  invalidateAuth: (nextState, replace) => {
    debugger;
    if (utils.hasToken()) {
      Cookies.remove('token');

    }

    replace({
      pathname: '/login'
    })
  }
};

module.exports = utils;
