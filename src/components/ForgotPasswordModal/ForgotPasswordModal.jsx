// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './forgotPasswordModal.css';

// Components
import Card from '../Card';
import Alert from '../Alert';
import Button from '../Button';
import Modal from '../Modal';
import ButtonGroup from '../ButtonGroup';

class ForgotPasswordModal extends Component {

  state = {
    email: this.props.modalData.email || ''
  }

  render() {
    const {
      closeModal,
      sendEmail,
    } = this.props;

    return (
      <Modal onClose={closeModal} md>
        <h3>Forgot Password</h3>
        <p>Please enter your Quartermaster username to recieve a password reset link</p>
        <div className="formField">
          <label>Email: </label>
          <input
            className="inputIcon"
            name="email"
            type="email"
            value= { this.state.email }
            onChange={ e => this.setState({email: e.target.value}) }
          />
        </div>

        <div className="modalFooter">
          <div className="userButtonGroup">
            <ButtonGroup>
              <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
              <Button classes="primary sm" onClick={this._sendAndClose}>
                Send Email
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    );
  };

  _sendAndClose = () => {
    const { closeModal, sendEmail} = this.props;

    sendEmail(this.state.email);
    closeModal();
  };

};

export default ForgotPasswordModal;
