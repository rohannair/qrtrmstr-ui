// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

// Styles
import styles from './playbookView.css';

// Containers
import {
  getPlaybooks,
  sendPlaybook,
  duplicatePlaybook,
  playbookSent,
  modifyPlaybook } from '../../actions/playbookViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import SendPlaybookModal from '../../components/SendPlaybookModal';
import EditPlaybookModal from '../../components/EditPlaybookModal';
import PlaybookViewItem from '../../components/PlaybookViewItem';

class PlaybookView extends Component {

  state = {
    chosenUser: {},
    chosenPlaybook: {},
    editedPlaybook: {},
    loading: false,
    newPlaybookName: null,
    message: null
  };

  componentWillMount() {
    this._renderPlaybookList();
    this._renderUserList();
  };

  componentWillReceiveProps(nextProps) {
    nextProps.message
    ? this.setState({
      loading: false,
      message: nextProps.message
    })
    : null;

  };

  render() {
    const sendPlaybookModal = Object.keys(this.state.chosenPlaybook).length > 0
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
      />
    : null;

    const items = Object.keys(this.props.playbookList).map(val => {
      let value = this.props.playbookList[val];
      return (
        <PlaybookViewItem
          key={value.id}
          {...value}
          onEditShowModal={ this._selectPlaybookForEditing }
          onSendShowModal={ this._selectPlaybookForSending }
          duplicate={ this._duplicatePlaybook }
        />
      );
    });

    return (
      <div className="playbookView">
        <div className="playbookView-header">
          <div className="cell checkbox"><input type="checkbox" /></div>
          <div className="cell name">Name</div>
          <div className="cell modified">Last Modified</div>
          <div className="cell collaborators">Collaborators</div>
          <div className="cell status">Status</div>
          <div className="cell actions">Actions</div>
        </div>

        { items }
        { editPlaybookModal }
        { sendPlaybookModal }
      </div>
    );
  };

  _selectPlaybookForSending = (val) => {
    const chosenPlaybook = ([...this.props.playbookList].filter(item => item.id === val.id))[0];
    this.setState({
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
      chosenPlaybook: {}
    });
    dispatch(playbookSent(null));
  };

  _closeEditPlaybookModal = () => {
    const { dispatch } = this.props;
    if (this.state.loading === false) {
      this.setState({
        editedPlaybook: {}
      });
      dispatch(playbookSent(null));
    }
  };

  // if a success message is returned, closes modal after 2.5 seconds
  _timeOutModal = () => {
    const { dispatch, message } = this.props;
    if ((this.state.loading === false) && this.state.message) {
      let delay = 2500; // milliseconds
      let before = Date.now();
      while (Date.now() < before + delay) {};
      this._closeSendPlaybookModal();
      this._closeEditPlaybookModal();
    }
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
    this.setState({
      loading: true
    });
    return dispatch(modifyPlaybook(token, {name: newPlaybookName}, editedPlaybook.id));
  };

  _duplicatePlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(duplicatePlaybook(token, id));
  };

  _changePlaybookParams = (value) => {
    this.setState({
      newPlaybookName: value
    });
  };

  _changeUserParams = (value) => {
    this.setState({
      chosenUser: {
        userId: value.id,
        token: null,
        firstName: value.first_name,
        lastName: value.last_name,
        email: value.email,
        companyName: 'Scotiabank',
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
export default connect(mapStateToProps)(PlaybookView);
