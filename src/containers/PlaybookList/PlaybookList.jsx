// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

// Styles
import styles from './playbookList.css';

// Actions
import {
  getPlaybooks,
  sendPlaybook,
  duplicatePlaybook,
  assignPlaybook,
  updateMessage,
  modifyPlaybook } from '../../actions/playbookViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Dialog from '../../components/Dialog';

import AssignPlaybookModal from '../../components/AssignPlaybookModal';
import EditPlaybookModal from '../../components/EditPlaybookModal';
import PlaybookListItem from '../../components/PlaybookListItem';

// Containers
import MapContainer from '../MapContainer';

class PlaybookList extends Component {

  state = {
    loading: false,
    visibleModal: null,
    modalData: {}
  };

  componentWillMount() {
    const { token, dispatch } = this.props;

    // Select all playbooks
    dispatch(getPlaybooks(token));
    // Select all users
    dispatch(getUsers(token));
  };

  componentWillReceiveProps(nextProps) {
    nextProps.message
    ? this.setState({
      loading: false
    })
    : null;
  };

  render() {
    const { visibleModal } = this.state;

    const editPlaybookModal = visibleModal === 'edit'
    ? <EditPlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        savePlaybook={ this._savePlaybook }
      />
    : null;

    const sendPlaybookModal = visibleModal === 'send'
    ? <AssignPlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        users={ this.props.users }
        action={ this._sendPlaybook }
        title={'Send'}
      />
    : null;

    const assignPlaybookModal = visibleModal === 'assign'
    ? <AssignPlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        users={ this.props.users }
        action={ this._savePlaybook }
        title={'Assign'}
      />
    : null;

    const confirmSendPlaybookModal = visibleModal === 'confirm'
    ? <Dialog
        onAction={ this._sendAndClose }
        buttonAction='Send'
        onClose={ this._closeModal }
        heading='Confirmation Needed'>
        <p>{`Confirm send playbook: ${this.state.modalData.name} to ${this.state.modalData.assignedUser.firstName} ${this.state.modalData.assignedUser.lastName}?`}</p>
      </Dialog>
    : null;

    const items = [...this.props.playbookList].map(val => {
      return (<PlaybookListItem
        key={val.id}
        {...val}
        users={ this.props.users }
        sendPlaybook={ this._sendPlaybookToAssignedUser }
        duplicatePlaybook={ this._duplicatePlaybook }
        showEditModal={ this._showEditModal }
        showAssignModal={ this._showAssignModal }
        showSendModal={ this._showSendModal }
      />
    )});

    return (
      <div className="playbookList">
        <Table headings = {['name', 'modified', 'assigned', 'status', 'actions']} >
          { items }
        </Table>

        { editPlaybookModal }
        { sendPlaybookModal }
        { assignPlaybookModal }
        { confirmSendPlaybookModal }
      </div>
    );
  };

  _closeModal = () => this.setState({ visibleModal: null, modalData: {} });

  _openModal = (visibleModal, playbook, assignedUser = null, state = null) => {
    this.setState({
      visibleModal,
      modalData: {
        name: playbook.name,
        id: playbook.id,
        assigned: playbook.assigned || null,
        assignedUser: assignedUser || null
      },
      ...state });
  };

  _showSendModal = (val) => {
    let assignedUser = null;
    if (val.assigned) {
      const assignedUserOrg = this.props.users.filter(value => value.id === val.assigned)[0];
      assignedUser = {
        id: assignedUserOrg.id,
        firstName: assignedUserOrg.firstName,
        lastName: assignedUserOrg.lastName,
        username: assignedUserOrg.username
      };
      return this._openModal('confirm', val, assignedUser);
    }
    const chosenPlaybook = [...this.props.playbookList]
      .filter(item => item.id === val.id)[0];

    return this._openModal('send', chosenPlaybook);
  };

  _showEditModal = (val) => {
    const editedPlaybook = [...this.props.playbookList]
      .filter(item => item.id === val.id)[0];

    this._openModal('edit', editedPlaybook);
  };

  _showAssignModal = (val) => {
    const assignedPlaybook = [...this.props.playbookList]
      .filter(item => item.id === val.id)[0];

    this._openModal('assign', assignedPlaybook);
  };

  _closeAlert = () => {
    const { dispatch } = this.props;
    dispatch(updateMessage(null));
  };

  _sendAndClose = () => {
    this._sendPlaybook(this.state.modalData.id, this.state.modalData.assignedUser);
    this._closeModal();
  };

  _sendPlaybook = (id, selected) => {
    const { token, dispatch } = this.props;

    const welcomeEmailParams = {
      userId: selected.id,
      firstName: selected.firstName,
      lastName: selected.lastName,
      email: selected.username,
      playbookId: id,
      emailTemplate: 'welcomeEmail'
    };

    return dispatch(sendPlaybook(token, welcomeEmailParams));
  };

  _savePlaybook = (id, payload) => {
    const { token, dispatch } = this.props;
    const wrapPayload = { selected: payload };
    return dispatch(modifyPlaybook(token, wrapPayload, id));
  };

  _duplicatePlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(duplicatePlaybook(token, id));
  };

};

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');

  return {
    token,
    playbookList: state.playbookAdmin.list,
    users: state.app.users,
    message: state.playbookAdmin.message
  };
};
export default connect(mapStateToProps)(PlaybookList);
