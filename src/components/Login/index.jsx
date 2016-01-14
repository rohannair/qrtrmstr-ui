import React, { Component, PropTypes } from 'react';
import styles from './login.css';

import Card from '../Card';

class Login extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func,
    submitForm: PropTypes.func,
  };

  static defaultProps = {
    submitForm    : () => {},
    forgotPassword: () => alert('OOPS')
  };

  render() {
    const { submitForm, forgotPassword } = this.props;

    return (
      <div className="login-box">
        <form
        onSubmit={submitForm}>

          <label className="inputField">
            Username:
            <input
              type="email"
              ref="username"
              name="username"
              placeholder="Your email"
              />
          </label>

          <label className="inputField">
            Password:
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Your password"
              />
          </label>

          <div>
            <button
              className="button"
              type="submit">
              Submit
            </button>

          </div>
        </form>

        <button
          className="button-link"
          onClick={forgotPassword}>
          I forgot my password
        </button>
      </div>
    );
  }
}

export default Login;
