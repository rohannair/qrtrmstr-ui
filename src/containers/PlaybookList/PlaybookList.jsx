// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

// Styles
import styles from './playbookList.css';

// Containers
import {
  getPlaybooks,
  sendPlaybook,
  duplicatePlaybook,
  assignPlaybook,
  updateMessage,
  modifyPlaybook } from '../../actions/playbookViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import SendPlaybookModal from '../../components/SendPlaybookModal';
import EditPlaybookModal from '../../components/EditPlaybookModal';
import AssignPlaybookModal from '../../components/AssignPlaybookModal';
import MapContainer from '../MapContainer';
import PlaybookListItem from '../../components/PlaybookListItem';

class PlaybookList extends Component {

  state = {
    chosenUser: {},
    chosenPlaybook: {},
    editedPlaybook: {},
    assignedPlaybook: {},
    loading: false,
    newPlaybookName: null,
    openSendModal: false
  };

  componentWillMount() {
    this._renderPlaybookList();
    this._renderUserList();
  };

  componentWillReceiveProps(nextProps) {
    nextProps.message
    ? this.setState({
      loading: false
    })
    : null;
  };

  render() {
    const sendPlaybookModal = this.state.openSendModal
    ? <SendPlaybookModal
        playbookName={this.state.chosenPlaybook.name}
        playbookID={this.state.chosenPlaybook.id}
        users={this.props.users}
        closeModal={this._closeSendPlaybookModal}
        sendPlaybook={this._sendPlaybook}
        onChange={this._changeUserParams}
        latestUser={this.state.chosenUser}
        loading={this.state.loading}
        message={this.props.message}
        timeOutModal={this._timeOutModal}
        closeAlert={this._closeAlert}
      />
    : null;

    const editPlaybookModal = Object.keys(this.state.editedPlaybook).length > 0
    ? <EditPlaybookModal
        playbookName={this.state.editedPlaybook.name}
        playbookID={this.state.editedPlaybook.id}
        closeModal={this._closeEditPlaybookModal}
        savePlaybook={this._savePlaybook}
        onChange={this._changePlaybookParams}
        loading={this.state.loading}
        message={this.props.message}
        timeOutModal={this._timeOutModal}
        newPlaybookName={this.state.newPlaybookName}
        closeAlert={this._closeAlert}
      />
    : null;

    const assignPlaybookModal = Object.keys(this.state.assignedPlaybook).length > 0
    ? <AssignPlaybookModal
        playbookName={this.state.assignedPlaybook.name}
        playbookID={this.state.assignedPlaybook.id}
        users={this.props.users}
        closeModal={this._closeAssignPlaybookModal}
        assignPlaybook={this._assignPlaybook}
        onChange={this._changeUserParams}
        latestUser={this.state.chosenUser}
        loading={this.state.loading}
        message={this.props.message}
        timeOutModal={this._timeOutModal}
        closeAlert={this._closeAlert}
      />
    : null;
    const items = [...this.props.playbookList].map(val =>
      <PlaybookListItem
        key={val.id}
        {...val}
        users={this.props.users}
        sendPlaybookToAssignedUser={this._sendPlaybookToAssignedUser}
        openSendModal={ this._showSendModal }
        onEditShowModal={ this._selectPlaybookForEditing }
        duplicate={ this._duplicatePlaybook }
        onAssignShowModal={ this._selectPlaybookForAssigning }
        onSendShowModal={ this._selectPlaybookForSending }
      />
    );

    return (
      <div className="playbookList">
        <div className="playbookList-header">
          <div className="cell checkbox"><input type="checkbox" /></div>
          <div className="cell name">Name</div>
          <div className="cell modified">Last Modified</div>
          <div className="cell assigned">Assigned To</div>
          <div className="cell collaborators">Collaborators</div>
          <div className="cell status">Status</div>
          <div className="cell actions">Actions</div>
        </div>

        { items }
        { editPlaybookModal }
        { sendPlaybookModal }
        { assignPlaybookModal }
      </div>
    );
  };

  _showSendModal = (val) => {
    const chosenPlaybook = ([...this.props.playbookList].filter(item => item.id === val.id))[0];

    this.setState({
      openSendModal: true,
      chosenPlaybook
    });
  };

  _selectPlaybookForEditing = (val) => {
    const editedPlaybook = ([...this.props.playbookList].filter(item => item.id === val.id))[0];

    this.setState({
      editedPlaybook,
      newPlaybookName: ''
    });
  };

  _selectPlaybookForAssigning = (val) => {
    const assignedPlaybook = ([...this.props.playbookList].filter(item => item.id === val.id))[0];
    this.setState({
      assignedPlaybook
    });
  };

  _renderPlaybookList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getPlaybooks(token));
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  };

  _closeSendPlaybookModal = () => {
    const { dispatch } = this.props;

    this.setState({
      chosenPlaybook: {},
      openSendModal: false
    });

    dispatch(updateMessage(null));
  };

  _closeEditPlaybookModal = () => {
    const { dispatch } = this.props;
    if (this.state.loading === false) {
      this.setState({
        editedPlaybook: {}
      });
      dispatch(updateMessage(null));
    }
  };

  _closeAlert = () => {
    const { dispatch } = this.props;
    dispatch(updateMessage(null));
  }


  _closeAssignPlaybookModal = () => {
    const { dispatch } = this.props;
    this.setState({
      assignedPlaybook: {}
    });
    dispatch(updateMessage(null));
  };

  _timeOutModal = (val) => {
    val === 'edit' ? setTimeout(() => this._closeEditPlaybookModal(), 2000) : null;
    val === 'send' ? setTimeout(() => this._closeSendPlaybookModal(), 2000) : null;
  };

  _sendPlaybook = () => {
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    this.setState({
      loading: true
    });

    return dispatch(sendPlaybook(token, chosenUser));
  };

  _savePlaybook = () => {
    const { token, dispatch } = this.props;
    const { newPlaybookName, editedPlaybook } = this.state;

    return dispatch(modifyPlaybook(token, {name: newPlaybookName}, editedPlaybook.id));
  };

  _duplicatePlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(duplicatePlaybook(token, id));
  };

  _assignPlaybook = () => {
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    return dispatch(assignPlaybook(token, chosenUser.playbookId, chosenUser.userId));
  }

  _changePlaybookParams = (value) => {
    this.setState({
      newPlaybookName: value
    });
  };

  _sendPlaybookToAssignedUser = (value) => {
    this._changeUserParams(value);
    this._sendPlaybook();
  }

  _changeUserParams = (value) => {
    this.setState({
      chosenUser: {
        userId: value.id,
        firstName: value.first_name,
        lastName: value.last_name,
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
