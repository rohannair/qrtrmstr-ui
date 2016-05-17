// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './editPlaybookModal.css';

// Components
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class SendPlaybookModal extends Component {

  componentWillMount() {
    this.props.onChange(this.props.playbookName);
  };

  render() {
    const {
      playbookName,
      playbookID,
      closeModal,
      savePlaybook,
      onChange,
      loading,
      message,
      timeOutModal,
      newPlaybookName } = this.props;

    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;
    const feedback = message ? <div className="successText"><p className="errorMsg">{message}</p></div> : null;

    return (
      <div className="openModal modalDialog">
        <div className="modal">
          <Card>
            <h3>Edit playbook {playbookName} </h3>
            <div>
              <div className="formField">
                <label>User: </label>
                <input
                  className="inputIcon"
                  name="name"
                  value= { newPlaybookName }
                  onChange={ e => onChange(e.target.name, e.target.value) }
                />
              </div>
            </div>
            <div className="modalFooter">
              <div className="userButtonGroup">
                <ButtonGroup>
                  <Button classes="primary sm" onClick={savePlaybook}>Send Email</Button>
                  <Button classes="primary sm" onClick={closeModal}>Cancel</Button>
                </ButtonGroup>
              </div>
              <div className="errorContainer">
                { feedback }
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

export default SendPlaybookModal;
