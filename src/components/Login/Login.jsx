import React, { Component, PropTypes } from 'react';
import styles from './login.css';

import Card from '../Card';
import Button from '../Button';

class Login extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func,
    submitForm: PropTypes.func,
  };

  static defaultProps = {
    submitForm    : () => {},
    forgotPassword: () => console.log('OOPS')
  };

  state = {
    username: '',
    password: ''
  };

  render() {
    const { submitForm, forgotPassword } = this.props;

    //TODO: Use Alert here when Alert is merged in
    const errorEl = this.props.error
    ? <div>{`ERROR: ${this.props.error}`}</div>
    : null;

    return (
      <div className="login-box">
        <Card>
          <h2>Log-in to Quartermaster</h2>
          <form
          className="form"
          onSubmit={ this._submitForm }>

            <label className="inputField">
              Username:
              <input
                type="email"
                ref="username"
                name="username"
                placeholder="Your email"
                value={this.state.name}
                onChange={ e => this._changeVal(e.target.name, e.target.value) }
                />
            </label>

            <label className="inputField">
              Password:
              <input
                type="password"
                ref="password"
                name="password"
                placeholder="Your password"
                value={this.state.password}
                onChange={ e => this._changeVal(e.target.name, e.target.value) }
                />
            </label>

            { errorEl }
            <Button
              classes="primary lgLong"
              onClick={ this._submitForm }>
              Submit
            </Button>
          </form>

          <Button
            classes="transparent sm"
            onClick={forgotPassword}>
            I forgot my password
          </Button>
        </Card>
      </div>
    );
  };

  _changeVal = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  _submitForm = () => {
    const { username, password } = this.state;
    return this.props.submitForm({username, password});
  };
}

export default Login;
