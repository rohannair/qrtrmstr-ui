import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './newUserModal.css';
import { Modal } from 'react-bootstrap';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class NewUserModal extends Component {

  render() {
    const {val, showModal, renderModal, submitNewUser, onChange, closeModal, loading, errorMessage, roles, chosenRole } = this.props;
    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;
    const errorText = errorMessage ? <div className="errorText"><p className="errorMsg">{errorMessage}</p></div> : null;
    const rolesOptions = Object.keys(roles).map(index => {
      let role = roles[index];
      return <option value={ JSON.stringify(Number(role.id)) } key={role.id}>{role.name}</option>;
    });

    return (
      <Modal animation={true} show={showModal} onHide={closeModal}>
        <Card className="modal">
          <Modal.Header>
            <Modal.Title>Add Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="formField">
              <label>First Name: </label>
              <input
                className="inputIcon"
                name="first_name"
                value= { val.first_name }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <label>Last Name: </label>
              <input
                className="inputIcon"
                name="last_name"
                value= { val.last_name }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <label>Email: </label>
              <input
                className="inputIcon"
                name="personal_email"
                value= { val.personal_email }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <label>Role: </label>
              <select className="inputIcon" name="role_id" value={ chosenRole } onChange={e => onChange(e.target.name, JSON.parse(e.target.value)) }>
                <option value=""></option>
                { rolesOptions }
              </select>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <div className="userButtonGroup">
              <ButtonGroup>
                <div className="spinnerContainer">
                  { loadingIcon }
                </div>
                <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
                <Button classes="primary sm" onClick={submitNewUser}>Add</Button>
              </ButtonGroup>
            </div>
            <div className="errorContainer">
              { errorText }
            </div>
          </Modal.Footer>
        </Card>
      </Modal>
    );
  };
};

export default NewUserModal;