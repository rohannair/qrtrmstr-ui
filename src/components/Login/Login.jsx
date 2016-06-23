import React, { Component, PropTypes } from 'react';
import styles from './login.css';

import Alert from '../Alert';
import Button from '../Button';
import Card from '../Card';

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
    const errorEl = this.props.error
    ? <Alert danger>{`ERROR: ${this.props.error}`}</Alert>
    : null;

    const messageEl = this.props.message
    ? <Alert success>{`SUCCESS: ${this.props.message}`}</Alert>
    : null;

    return (
      <div className="login-box">
        <Card>
          <h2>Log-in to Quartermaster</h2>

          <div className="errorContainer">{ errorEl }</div>
          <div className="errorContainer">{ messageEl }</div>
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


            <input className="btn primary lgLong" type="submit"/>
          </form>

          <Button
            onClick={this.props.showForgotPasswordModal}
            classes={"transparent sm"}>
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

  _submitForm = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    return this.props.submitForm({username, password});
  };
}

export default Login;
