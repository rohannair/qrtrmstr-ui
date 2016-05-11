import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './newUserModal.css';
import { Modal } from 'react-bootstrap';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class NewUserModal extends Component {

  state = {
    loading: this.props.loading || false,
    errorMessage: this.props.errorMessage || null
  };

  render() {
    const {val, showModal, renderModal, submitNewUser, onChange, closeModal, loading, errorMessage } = this.props;
    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;
    const errorText = errorMessage ? <div className="visibleError"><i className="fa fa-exclamation-circle"></i><ul><li>{errorMessage}</li></ul></div> : null;
    return (
      <Modal animation={true} show={showModal} onHide={closeModal}>
        <Card className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Add Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="formField">
              <div className="iconContainer">
                <i className="fa fa-user iconInfo"></i>
              </div>
              <input
                className="inputIcon"
                name="first_name"
                placeholder="First Name"
                value= { val.first_name }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <div className="iconContainer">
                <i className="fa fa-user iconInfo"></i>
              </div>
              <input
                className="inputIcon"
                name="last_name"
                placeholder="Last Name"
                value= { val.last_name }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <div className="iconContainer">
                <i className="fa fa-envelope iconInfo"></i>
              </div>
              <input
                className="inputIcon"
                name="personal_email"
                placeholder="Email Address"
                value= { val.personal_email }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <div className="iconContainer">
                <i className="fa fa-envelope iconInfo"></i>
              </div>
              <input
                className="inputIcon"
                name="personal_email"
                placeholder="Role"
                value= { val.personal_email }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <div className="errorText">
              { errorText }
            </div>
            <div className="userButtonGroup">
              <ButtonGroup>
                <div className="spinnerContainer">
                  { loadingIcon }
                </div>
                <Button classes="primary sm" onClick={submitNewUser}>Create New Member</Button>
                <Button classes="primary sm" onClick={closeModal}>Cancel</Button>
              </ButtonGroup>
            </div>
          </Modal.Footer>
        </Card>
      </Modal>
    );
  };
};

export default NewUserModal;