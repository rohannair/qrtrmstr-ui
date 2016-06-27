import React, { Component, PropTypes } from 'react';
import styles from './passwordReset.css';

import Alert from '../Alert';
import Button from '../Button';
import Card from '../Card';

class PasswordReset extends Component {
  static propTypes = {
    submitForm: PropTypes.func
  };

  static defaultProps = {
    submitForm: () => {}
  };

  state = {
    password: '',
    passwordCheck: ''
  };

  render() {
    const { submitForm } = this.props;
    const errorEl = this.props.error
    ? <Alert danger>{`ERROR: ${this.props.error}`}</Alert>
    : null;

    const messageEl = this.props.message
    ? <Alert success>{`SUCCESS: ${this.props.message}`}</Alert>
    : null;

    return (
      <div className="login-box">
        <Card>
          <h1>Password Reset</h1>
          <div className="errorContainer">{ errorEl }</div>
          <div className="errorContainer">{ messageEl }</div>
          <form
          className="form"
          onSubmit={ this._submitForm }>

            <label className="inputField">
              Password:
              <input
                type="password"
                ref="password"
                name="password"
                placeholder="New password"
                value={this.state.password}
                onChange={ e => this._changeVal(e.target.name, e.target.value) }
                />
            </label>

            <label className="inputField">
              Retype Password:
              <input
                type="password"
                ref="passwordCheck"
                name="passwordCheck"
                placeholder="Type password again"
                value={this.state.passwordCheck}
                onChange={ e => this._changeVal(e.target.name, e.target.value) }
                />
            </label>


            <input className="btn primary lgLong" type="submit"/>
          </form>

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
    const { password, passwordCheck } = this.state;

    return this.props.submitForm({password});
  };
}

export default PasswordReset;
