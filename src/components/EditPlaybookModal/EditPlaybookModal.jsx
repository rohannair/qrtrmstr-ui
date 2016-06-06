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
    message: this.props.message || null
  }

  componentWillMount() {
    this.props.onChange(this.props.playbookName);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.message != this.state.message) {
      this.setState({
        message: nextProps.message
      });
    }
  }


  render() {
    const {
      playbookName,
      playbookID,
      closeModal,
      savePlaybook,
      onChange,
      loading,
      closeAlert,
      timeOutModal,
      newPlaybookName } = this.props;

    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;
    const feedback = this.state.message ? <Alert closeAlert={closeAlert} success={true}>{this.state.message}</Alert> : null;

    return (
      <Modal onClose={closeModal} md>
        <h3>Edit Playbook: {playbookName} </h3>
        <div>
          <div className="formField">
            <label>Playbook Title: </label>
            <input
              className="inputIcon"
              name="name"
              value= { newPlaybookName }
              onChange={ e => onChange(e.target.value) }
            />
          </div>
        </div>
        <div className="modalFooter">
          <div className="userButtonGroup">
            <ButtonGroup>
              <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
              <Button classes="primary sm" onClick={savePlaybook}>Update</Button>
            </ButtonGroup>
          </div>
          <div className="spinnerContainer">
            { loadingIcon }
          </div>
        </div>
        { feedback }
      </Modal>
    );
  };

};

export default EditPlaybookModal;
