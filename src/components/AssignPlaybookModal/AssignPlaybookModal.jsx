// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './assignPlaybookModal.css';

// Components
import Alert from '../Alert';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Modal from '../Modal';

class AssignPlaybookModal extends Component {

  state = {
    selected: this.props.users[0] || {}
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
      title
    } = this.props;
    const { selected } = this.state;

    const opts = Object.keys(users).map(idx => {
      let user = users[idx];
      return <option key={user.id} value={user.id}>{user.first_name + ' ' + user.last_name}</option>;
    });

    return (
      <Modal onClose={closeModal} md>
        <h3>{`${title}: ${playbook.name}`}</h3>

        <div className="formField">
          <label>Assign to user: </label>
            <select className="inputIcon" value={ selected.id || selected } onChange={ this._onChange }>
              { opts }
            </select>
        </div>

        <div className="modalFooter">
          <div className="userButtonGroup">
            <ButtonGroup>
              <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
              <Button classes="primary sm" onClick={this._actAndClose}>
                Update
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    );
  };

  _onChange = e => {
    e.stopPropagation();
    const selected = this.props.users.filter(val => val.id === e.target.value)[0];
    this.setState({
      selected
    });
  };

  _actAndClose = () => {
    const { closeModal, action, playbook } = this.props;

    action(playbook.id, this.state);
    closeModal();
  }

};

export default AssignPlaybookModal;
