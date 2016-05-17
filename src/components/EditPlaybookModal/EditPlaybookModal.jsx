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
    const latestPerson = this.props.users[(this.props.users.length) - 1];
    const latestPersonInfo = {
      id: latestPerson.id,
      first_name: latestPerson.first_name,
      last_name: latestPerson.last_name,
      email: latestPerson.username,
      playbookID: this.props.playbookID };
    this.props.onChange(latestPersonInfo);
  };

  componentDidUpdate() {
    // if a success message is returned, closes modal after 2.5 seconds
    // if (this.props.message) this.props.timeOutModal();
  };

  render() {
    const {
      latestUser,
      playbookName,
      playbookID,
      users,
      closeModal,
      sendPlaybook,
      onChange,
      loading,
      message,
      timeOutModal } = this.props;
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
      <div className="openModal modalDialog">
        <div className="modal">
          <Card>
            <h3>Send playbook {playbookName} to user </h3>
            <div>
              <div className="formField">
                <label>User: </label>
                <select className="inputIcon" value={ defaultUser } onChange={e => onChange(JSON.parse(e.target.value)) }>
                  { userOptions }
                </select>
              </div>
            </div>
            <div className="modalFooter">
              <div className="userButtonGroup">
                <ButtonGroup>
                  <Button classes="primary sm" onClick={sendPlaybook}>Send Email</Button>
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
