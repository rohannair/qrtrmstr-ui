// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './assignPlaybookModal.css';

// Components
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Modal from '../Modal';

class AssignPlaybookModal extends Component {

  componentWillMount() {
    const latestPerson = this.props.users[0];
    const latestPersonInfo = {
      id: latestPerson.id,
      first_name: latestPerson.first_name,
      last_name: latestPerson.last_name,
      email: latestPerson.username,
      playbookID: this.props.playbookID };
    this.props.onChange(latestPersonInfo);
  };

  componentDidUpdate() {
    if (this.props.message) this.props.timeOutModal('edit');
  };

  render() {
    const {
      latestUser,
      playbookName,
      users,
      playbookID,
      closeModal,
      assignPlaybook,
      onChange,
      loading,
      message,
      timeOutModal,
      newPlaybookAssignee } = this.props;

    let selectedUser = {
      id: latestUser.userId,
      first_name: latestUser.firstName,
      last_name: latestUser.lastName,
      email: latestUser.email,
      playbookID: latestUser.playbookId
    };

    let defaultUser = JSON.stringify(selectedUser);
    const loadingIcon = loading ? <i className="fa fa-cog fa-lg fa-spin spinner"></i> : null;
    const feedback = message ? <div className="successText"><p className="errorMsg">{message}</p></div> : null;
    const userOptions = Object.keys(users).map(index => {
      let user = users[index];
      let userInfo = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.username, playbookID };
      return <option value={ JSON.stringify(userInfo) } key={user.id}>{user.first_name + ' ' + user.last_name}</option>;
    });

    return (
      <Modal onClose={closeModal}>
        <h3>Assign Playbook: {playbookName} </h3>
        <div>
          <div className="formField">
            <label>User: </label>
              <select className="inputIcon" value={ defaultUser } onChange={e => { e.stopPropagation(); onChange(JSON.parse(e.target.value)) } }>
                { userOptions }
              </select>
          </div>
        </div>
        <div className="modalFooter">
          <div className="userButtonGroup">
            <ButtonGroup>
              <Button classes="primary sm" onClick={assignPlaybook}>Update</Button>
              <Button classes="primary sm" onClick={closeModal}>Close</Button>
            </ButtonGroup>
          </div>
          <div className="errorContainer">
            { feedback }
          </div>
          <div className="spinnerContainer">
            { loadingIcon }
          </div>
        </div>
      </Modal>
    );
  };
};

export default AssignPlaybookModal;
