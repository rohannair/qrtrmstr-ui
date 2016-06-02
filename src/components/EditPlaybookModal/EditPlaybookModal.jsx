// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './editPlaybookModal.css';

// Components
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class EditPlaybookModal extends Component {

  componentWillMount() {
    this.props.onChange(this.props.playbookName);
  };

  componentDidUpdate() {
    if (this.props.message) this.props.timeOutModal('edit');
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
        <div className="editPlaybookModal">
          <Card>
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

export default EditPlaybookModal;
