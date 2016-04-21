import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './newUserModal.css';
import { Modal } from 'react-bootstrap';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class NewUserModal extends Component {

// const NewUserModal = ({val, showModal, toggleModal, submitNewUser, onChange }) => {
  render() {
    const {val, showModal, renderModal, submitNewUser, onChange, closeModal } = this.props;
    return (
      <Modal animation={true} show={showModal} onHide={closeModal}>
        <Card className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Add a new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="formField">
              <label>First Name:</label>
              <input
                name="first_name"
                value= { val.first_name }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <label>Last Name:</label>
              <input
                name="last_name"
                value= { val.last_name }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>

            <div className="formField">
              <label>Email:</label>
              <input
                name="email"
                value= { val.email }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>

            <div className="formField">
              <label>Work Email:</label>
              <input
                name="work_email"
                value= { val.work_email }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button classes="primary sm" onClick={submitNewUser}>Create User</Button>
              <Button classes="primary sm" onClick={closeModal}>Cancel</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Card>
      </Modal>
    );
  };
};

export default NewUserModal;