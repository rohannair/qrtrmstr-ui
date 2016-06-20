import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './newUserModal.css';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class NewUserModal extends Component {

  render() {
    const {
      val,
      showModal,
      renderModal,
      submitNewUser,
      onChange,
      closeModal,
      loading,
      errorMessage,
      roles,
      chosenRole } = this.props;
    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;
    const errorText = errorMessage ? <div className="errorText"><p className="errorMsg">{errorMessage}</p></div> : null;
    const rolesOptions = Object.keys(roles).map(index => {
      let role = roles[index];
      return <option value={ JSON.stringify(Number(role.id)) } key={role.id}>{role.name}</option>;
    });

    return (

    <div className="openModal modalDialog">
      <div className="newUserModal">
        <Card>
          <h3>Add Team Member</h3>
          <div>
            <div className="formField">
              <label>First Name: </label>
              <input
                className="inputIcon"
                name="first_name"
                value= { val.firstName }
                onChange={ e => onChange(e.target.name, e.target.value) }
              />
            </div>
            <div className="formField">
              <label>Last Name: </label>
              <input
                className="inputIcon"
                name="last_name"
                value= { val.lastName }
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
          </div>
          <div className="modalFooter">
            <div className="userButtonGroup">
              <ButtonGroup>
                <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
                <Button classes="primary sm" onClick={submitNewUser}>Add</Button>
              </ButtonGroup>
            </div>
            <div className="errorContainer">
              { errorText }
            </div>
            <div className="spinnerContainer">
              { loadingIcon }
            </div>
          </div>
        </Card>
      </div>
    </div>
    );
  };
};

export default NewUserModal;
