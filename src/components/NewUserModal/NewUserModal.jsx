import React from 'react';
import classNames from 'classnames';
import styles from './newUserModal.css';
import { Modal } from 'react-bootstrap';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const NewUserModal = ({val, showModal, toggleModal, submitNewUser, onChange }) => {
  return (
    <Modal animation={true} show={showModal} onHide={toggleModal}>
      <Card className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formField">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value= { val.first_name == null ? '' : val.first_name }
              onChange={ e => onChange(e.target.name, e.target.value) }
            />
          </div>
          <div className="formField">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value= { val.last_name == null ? '' : val.last_name }
              onChange={ e => onChange(e.target.name, e.target.value) }
            />
          </div>

          <div className="formField">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value= { val.email == null ? '' : val.email }
              onChange={ e => onChange(e.target.name, e.target.value) }
            />
          </div>

          <div className="formField">
            <label>Work Email:</label>
            <input
              type="text"
              name="work_email"
              value= { val.work_email == null ? '' : val.work_email }
              onChange={ e => onChange(e.target.name, e.target.value) }
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button classes="primary sm" onClick={submitNewUser}>Create User</Button>
            <Button classes="primary sm" onClick={toggleModal}>Cancel</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Card>
    </Modal>
  );
};

export default NewUserModal;