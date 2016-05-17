// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

// Styles
import styles from './playbookView.css';

// Containers
import { getPlaybooks, sendPlaybook, duplicatePlaybook, playbookSent } from '../../actions/playbookViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import SendPlaybookModal from '../../components/SendPlaybookModal';
import PlaybookViewItem from '../../components/PlaybookViewItem';

class PlaybookView extends Component {

  state = {
    chosenUser: {},
    chosenPlaybook: {},
    editedPlaybook: {},
    loading: false
  };

  componentWillMount() {
    this._renderPlaybookList();
    this._renderUserList();
  };

  componentWillReceiveProps(nextProps) {
    const { chosenPlaybook } = this.state;
    nextProps.message
    ? this.setState({
      loading: false,
      message: nextProps.message
    })
    : null;

  };

  render() {
    const playbookModal = Object.keys(this.state.chosenPlaybook).length > 0
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

    const items = [...this.props.playbookList].map(val => <PlaybookViewItem key={val.id} {...val} onShowModal={ this._selectPlaybookForSending } duplicate={ this._duplicatePlaybook } />);

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
        { playbookModal }
      </div>
    );
  };

  _selectPlaybookForSending = (val) => {
    const chosenPlaybook = ([...this.props.playbookList].filter(item => item.id === val.id))[0];
    this.setState({
      chosenPlaybook,
      message: null
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

  _timeOutModal = () => {
    const { dispatch, message } = this.props;
    let delay = 2500; // milliseconds
    let before = Date.now();
    while (Date.now() < before + delay) {};
    this._closeSendPlaybookModal();
  };

  _sendPlaybook = () => {
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    this.setState({
      loading: true
    });
    return dispatch(sendPlaybook(token, chosenUser));
  };

  _duplicatePlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(duplicatePlaybook(token, id));
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
    const { chosenUser } = this.state;
  };

  // _changeEdited

};

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    showModal: state.playbookAdmin.showModal,
    token,
    playbookList: state.playbookAdmin.list,
    users: state.app.users,
    message: state.playbookAdmin.message
  };
};
export default connect(mapStateToProps)(PlaybookView);
