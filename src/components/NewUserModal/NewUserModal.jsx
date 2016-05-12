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
    const errorText = errorMessage ? <div className="errorText"><i className="fa fa-exclamation-circle"></i><ul><li>{errorMessage}</li></ul></div> : null;
    const rolesOptions = Object.keys(roles).map(index => {
      let role = roles[index];
      return <option value={ JSON.stringify(Number(role.id)) } key={role.id}>{role.name}</option>;
    });

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
              <div className="iconContainer select">
                <i className="fa fa-envelope iconInfo"></i>
              </div>
              <select className="inputIcon selectInput" name="role_id" value={ chosenRole } onChange={e => onChange(e.target.name, JSON.parse(e.target.value)) }>
                <option value="Choose A Role">Choose A Role</option><i className="fa fa-user iconInfo"></i>
                { rolesOptions }
              </select>
              <div className="selectArrow">
                <i className="fa fa-chevron-down"></i>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <div className="errorContainer">
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