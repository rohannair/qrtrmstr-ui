// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './editPlaybookModal.css';

// Components
import Card from '../Card';
import Alert from '../Alert';
import Button from '../Button';
import Modal from '../Modal';
import ButtonGroup from '../ButtonGroup';

class EditPlaybookModal extends Component {

  state = {
    name: this.props.playbook.name || ''
  }

  render() {
    const {
      playbook,
      closeModal,
      savePlaybook,
    } = this.props;

    return (
      <Modal onClose={closeModal} md>
        <h3>Edit Playbook: { playbook.name } </h3>

        <div className="formField">
          <label>Playbook Title: </label>
          <input
            className="inputIcon"
            name="name"
            value= { this.state.name }
            onChange={ e => this.setState({name: e.target.value}) }
          />
        </div>

        <div className="modalFooter">
          <div className="userButtonGroup">
            <ButtonGroup>
              <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
              <Button classes="primary sm" onClick={this._saveAndClose}>
                Update
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    );
  };

  _saveAndClose = () => {
    const { closeModal, savePlaybook, playbook } = this.props;
    const { name } = this.state;

    savePlaybook(playbook.id, this.state);
    closeModal();
  };

};

export default EditPlaybookModal;
