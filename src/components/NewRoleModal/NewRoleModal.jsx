import React, { Component } from 'react';

import classNames from 'classnames';
import styles from './newRoleModal.css';

import Card from '../Card';
import Button from '../Button';
import Modal from '../Modal';
import ButtonGroup from '../ButtonGroup';

class NewRoleModal extends Component {

  render() {
    const {
      val,
      showModal,
      renderModal,
      submitNewRole,
      onChange,
      closeModal,
      loading,
      errorMessage } = this.props;

    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;

    const errorText = errorMessage ? <div className="errorText"><p className="errorMsg">{errorMessage}</p></div> : null;

    return (

    <Modal md>
      <div className="newUserModal">
        <h3>Add New Role</h3>
        <div className="modal-body">

          <div className="formField">
            <label>Name: </label>
            <input
              type="text"
              className="inputIcon"
              name="name"
              value= { val.name }
              onChange={ e => onChange(e.target.value) }
            />
          </div>

        </div>
        <div className="modalFooter">
          <div className="userButtonGroup">
            <ButtonGroup>
              <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
              <Button classes="primary sm" onClick={submitNewRole}>Add</Button>
            </ButtonGroup>
          </div>
          <div className="errorContainer">
            { errorText }
          </div>
          <div className="spinnerContainer">
            { loadingIcon }
          </div>
        </div>
      </div>
    </Modal>
    );
  };
};

export default NewRoleModal;
