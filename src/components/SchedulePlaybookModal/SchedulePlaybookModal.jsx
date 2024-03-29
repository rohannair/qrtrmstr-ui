// Deps
import React, { Component } from 'react';
import moment from 'moment';

// Styles
import classNames from 'classnames';
import styles from './schedulePlaybookModal.css';

// Components
import Alert from '../Alert';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Modal from '../Modal';

class SchedulePlaybookModal extends Component {

  state = {
    selected: this.props.users[0] || {},
    time: '',
    date: '',
    emailTemplate: this.props.emailTemplates[0] || ''
  }

  componentDidMount() {
    if (this.props.playbook.assigned) {
      this.setState({
        selected: this.props.users.filter(val => val.id === this.props.playbook.assigned)[0]
      });
    }
  }

  render() {
    const {
      playbook,
      closeModal,
      users,
      title,
      emailTemplates
    } = this.props;
    const { selected, emailTemplate } = this.state;

    const userOpts = Object.keys(users).map(idx => {
      let user = users[idx];
      return <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>;
    });

    const emailOpts = Object.keys(emailTemplates).map(idx => {
      let template = emailTemplates[idx];
      return <option key={template.id} value={template.id}>{template.displayName}</option>;
    });

    return (
      <Modal onClose={closeModal} md>
        <h3>{`${title} Playbook: ${playbook.name}`}</h3>

        <div className="formField">
          <label>For user: </label>
            <select className="inputIcon" value={ selected.id || selected } onChange={ this._onChangeUser }>
              { userOpts }
            </select>
        </div>

        <div className="formField">
          <label>Email Template: </label>
            <select className="inputIcon" value={ emailTemplate.id || emailTemplate } onChange={ this._onChangeEmailTemplate }>
              { emailOpts }
            </select>
        </div>

        <div className="formField">
          <label>On: </label>
            <span>Date:</span>
            <input type="date" value={this.state.date} name="date" onChange={ e => this.setState({ date: e.target.value}) } />
            <span>Time:</span>
            <input name="startTime" value={ this.state.time } type="time" max='24:00' onChange={ e => this.setState({ time: e.target.value}) } />
        </div>

        <div className="modalFooter">
          <ButtonGroup>
            <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
            <Button classes="primary sm" onClick={this._actAndClose}>
              { title }
            </Button>
          </ButtonGroup>
        </div>
      </Modal>
    );
  };

  _onChangeUser = e => {
    e.stopPropagation();
    const selected = this.props.users.filter(val => val.id === e.target.value)[0];
    this.setState({
      selected
    });
  };

  _onChangeEmailTemplate = e => {
    e.stopPropagation();
    const emailTemplate = this.props.emailTemplates.filter(val => val.id === e.target.value)[0];
    this.setState({
      emailTemplate
    });
  };

  _actAndClose = () => {
    const { closeModal, action, playbook } = this.props;
    const { date, time } = this.state;

    // Take date and time in state and then need to convert into the sendAt unix ms time
    const sendAt = +moment(date + ' ' + time).format('x');

    action(playbook.id, this.state, sendAt);
    closeModal();
  }

};

export default SchedulePlaybookModal;
