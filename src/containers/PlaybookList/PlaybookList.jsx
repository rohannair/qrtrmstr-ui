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

import AssignPlaybookModal from '../../components/AssignPlaybookModal';
import EditPlaybookModal from '../../components/EditPlaybookModal';
import PlaybookListItem from '../../components/PlaybookListItem';

// Containers
import MapContainer from '../MapContainer';

class PlaybookList extends Component {

  state = {
    chosenUser: {},
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
        title={'Send Playbook'}
      />
    : null;

    const assignPlaybookModal = visibleModal === 'assign'
    ? <AssignPlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        users={ this.props.users }
        action={ this._savePlaybook }
        title={'Assign Playbook'}
      />
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
      </div>
    );
  };

  _closeModal = () => this.setState({ visibleModal: null, modalData: {} });
  _openModal = (visibleModal, playbook, state = null) => {
    this.setState({
      visibleModal,
      modalData: {
        name: playbook.name,
        id: playbook.id,
        assigned: playbook.assigned || null
      },
      ...state });
  };

  _showSendModal = (val) => {
    const chosenPlaybook = [...this.props.playbookList]
      .filter(item => item.id === val.id)[0];

    this._openModal('send', chosenPlaybook);
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

  _sendPlaybook = (id, { selected }) => {
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
    return dispatch(modifyPlaybook(token, payload, id));
  };

  _duplicatePlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(duplicatePlaybook(token, id));
  };

  _sendPlaybookToAssignedUser = (value) => {
    this._changeUserParams(value);
    this._sendPlaybook();
  };

  _changeUserParams = (value) => {
    this.setState({
      chosenUser: {
        userId: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        playbookId: value.playbookID,
        emailTemplate: 'welcomeEmail'
      }
    });
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
