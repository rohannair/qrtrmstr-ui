import Cookies from 'cookies-js';
import { has } from 'lodash';

module.exports = {
  hasToken: (store) => {
    if (has(store, 'token') || Cookies.get('token')) {
      return true;
    }
    return false;
  }
};

