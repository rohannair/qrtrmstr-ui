// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './sendPlaybookModal.css';

// Components
import Card from '../Card';
import Button from '../Button';
import Alert from '../Alert';
import ButtonGroup from '../ButtonGroup';
import Modal from '../Modal';

class SendPlaybookModal extends Component {

  state = {
    message: this.props.message || null
  }

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.message != this.state.message) {
      this.setState({
        message: nextProps.message
      });
    }
  }

  render() {
    const {
      latestUser,
      playbookName,
      playbookID,
      users,
      closeModal,
      sendPlaybook,
      onChange,
      closeAlert,
      loading,
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
    const feedback = this.state.message ? <Alert closeAlert={closeAlert} success={true}>{this.state.message}</Alert> : null;
    const userOptions = Object.keys(users).map(index => {
      let user = users[index];
      let userInfo = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.username, playbookID };
      return <option value={ JSON.stringify(userInfo) } key={user.id}>{user.first_name + ' ' + user.last_name}</option>;
    });

    return (
      <Modal onClose={closeModal} md>
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
              <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
              <Button classes="primary sm" onClick={sendPlaybook}>Send Email</Button>
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

export default SendPlaybookModal;
