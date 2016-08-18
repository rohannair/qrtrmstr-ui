// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import ReactPaginate from 'react-paginate';

// Styles
import styles from './playbookList.css';

// Actions
import {
  getPlaybooks,
  sendPlaybook,
  reSendPlaybookEmail,
  schedulePlaybook,
  cancelPlaybookEmail,
  duplicatePlaybook,
  assignPlaybook,
  unAssignPlaybook,
  updateMessage,
  modifyPlaybook } from '../../actions/playbookViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';

import AssignPlaybookModal from '../../components/AssignPlaybookModal';
import SendPlaybookModal from '../../components/SendPlaybookModal';
import SchedulePlaybookModal from '../../components/SchedulePlaybookModal';
import EditPlaybookModal from '../../components/EditPlaybookModal';
import PlaybookListItem from '../../components/PlaybookListItem';

// Containers
import MapContainer from '../MapContainer';

class PlaybookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenUser: {},
      loading: false,
      visibleModal: null,
      modalData: {},
      offset: 0,
      pageNum: 1,
      perPage: 10,
      emailTemplates : [
        {
          id: '1',
          displayName: 'Welcome',
          name: 'welcomeEmail'
        },
        {
          id: '2',
          displayName: 'General',
          name: 'generalEmail'
        }
      ]
    };
  };

  static defaultProps = {
    users: {
      results: []
    },

    playbookList: {
      results: []
    }
  }

  componentWillMount() {
    const { token, dispatch, users, playbookList } = this.props;
    const { offset, perPage } = this.state;

    console.log('------- TIME FOR CHECKS');
    console.log('Users', users);
    if (users.results.length === 0) dispatch(getUsers(token, 0, 100));

    console.log('Playbook List', playbookList);
    if (playbookList.results.length === 0) dispatch(getPlaybooks(token, offset, perPage));
  };

  componentWillReceiveProps(nextProps) {
    nextProps.message
    ? this.setState({
      loading: false
    })
    : null;
  };

  componentDidUpdate() {
    const { token, dispatch, users, playbookList } = this.props;
    const { offset, perPage } = this.state;

    console.log('------- TIME FOR CHECKS');
    console.log('Users', users);
    if (users.results.length === 0) dispatch(getUsers(token));

    console.log('Playbook List', playbookList);
    if (playbookList.results.length === 0) dispatch(getPlaybooks(token, offset, perPage));
  }

  render() {
    const { visibleModal } = this.state;

    const sendPlaybookModal = visibleModal === 'send'
    ? <SendPlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        users={ this.props.users.results }
        emailTemplates={ this.state.emailTemplates }
        action={ this._sendPlaybook }
        title={'Send'}
      />
    : null;

    const schedulePlaybookModal = visibleModal === 'schedule'
    ? <SchedulePlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        users={ this.props.users.results }
        emailTemplates={ this.state.emailTemplates }
        action={ this._schedulePlaybook }
        title={'Schedule'}
      />
    : null;

    const assignPlaybookModal = visibleModal === 'assign'
    ? <AssignPlaybookModal
        closeModal={ this._closeModal }
        playbook={ this.state.modalData }
        users={ this.props.users.results }
        action={ this._assignPlaybook }
        title={'Assign'}
      />
    : null;

    const items = [...this.props.playbookList.results].map(val => {
      return (<PlaybookListItem
        key={val.id}
        {...val}
        users={ this.props.users.results }
        sendPlaybook={ this._sendPlaybookToAssignedUser }
        reSendPlaybook={ this._reSendPlaybook }
        duplicatePlaybook={ this._duplicatePlaybook }
        cancelScheduledPlaybook={ this._cancelScheduledPlaybook }
        showAssignModal={ this._showAssignModal }
        showSendModal={ this._showSendModal }
        showScheduleModal={ this._showScheduleModal }
        savePlaybook={ this._savePlaybook }
        clearAssigned={ this._unassignPlaybook }
      />
    );});

    return (
      <div className="playbookList">

        <div className="playbookList-body">
          <div className="playbookList-metadata">Playbooks</div>
          { items }

          <div className="playbookList-metadata">
            {`Total playbooks: ${this.props.playbookList.total}`}
            <ReactPaginate
              previousLabel={" "}
              nextLabel={" "}
              breakLabel={<a href="">...</a>}
              pageNum={Math.ceil(this.props.playbookList.total / this.state.perPage)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              clickCallback={this._handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              previousLinkClassName={"fa fa-arrow-left tertiary"}
              nextLinkClassName={"fa fa-arrow-right tertiary"}
            />
          </div>
        </div>

        <div className="playbookList-sidebar">
          <Button
            classes="lgLong primary disabled"
            toolTipText="Coming soon!"
          >New Playbook</Button>
        </div>

        { sendPlaybookModal }
        { schedulePlaybookModal }
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
    const chosenPlaybook = [...this.props.playbookList.results]
      .filter(item => item.id === val.id)[0];

    this._openModal('send', chosenPlaybook);
  };

  _showEditModal = (val) => {
    const editedPlaybook = [...this.props.playbookList.results]
      .filter(item => item.id === val.id)[0];

    this._openModal('edit', editedPlaybook);
  };

  _showAssignModal = (val) => {
    const assignedPlaybook = [...this.props.playbookList.results]
      .filter(item => item.id === val.id)[0];

    this._openModal('assign', assignedPlaybook);
  };

  _showScheduleModal = (val) => {
    const scheduledPlaybook = [...this.props.playbookList.results]
      .filter(item => item.id === val.id)[0];

    this._openModal('schedule', scheduledPlaybook);
  };

  _closeAlert = () => {
    const { dispatch } = this.props;
    dispatch(updateMessage(null));
  };

  _assignPlaybook = (id, { selected }) => {
    const { id: userId } = selected;
    const { token, dispatch } = this.props;
    return dispatch(assignPlaybook(token, id, userId));
  };

  _unassignPlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(unAssignPlaybook(token, id));
  };

  _sendPlaybook = (id, { selected, emailTemplate }) => {
    const { token, dispatch } = this.props;

    const emailParams = {
      userId: selected.id,
      firstName: selected.firstName,
      lastName: selected.lastName,
      email: selected.username,
      playbookId: id,
      emailTemplate: emailTemplate.name
    };

    return dispatch(sendPlaybook(token, emailParams));
  };

  _reSendPlaybook = (id, userId) => {
    const { token, dispatch } = this.props;
    return dispatch(reSendPlaybookEmail(token, id, { userId }));
  };

  _schedulePlaybook = (id, { selected, emailTemplate }, sendAt) => {
    const { token, dispatch } = this.props;

    const emailParams = {
      userId: selected.id,
      firstName: selected.firstName,
      lastName: selected.lastName,
      email: selected.username,
      playbookId: id,
      emailTemplate: emailTemplate.name,
      sendAt
    };

    return dispatch(schedulePlaybook(token, emailParams));
  };

  _cancelScheduledPlaybook = (id) => {
    const { token, dispatch } = this.props;
    const deleteCheck = confirm('Are you sure you want to cancel this scheduled email?');
    if (deleteCheck) return dispatch(cancelPlaybookEmail(token, { playbookId: id }));
  };

  _savePlaybook = (id, payload) => {
    const { token, dispatch } = this.props;
    return dispatch(modifyPlaybook(token, payload, id));
  };

  _clearAssigned = (id, payload) => {
    const { token, dispatch } = this.props;
    return dispatch(modifyPlaybook(token, { selected: { id: null } }, id));
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
        emailTemplate: value.emailTemplate
      }
    });
  };

  _handlePageClick = (data) => {
    const offset = Math.ceil(data.selected * this.state.perPage);
    this.setState({ offset });
    const { token, dispatch } = this.props;
    return dispatch(getPlaybooks(token, offset, this.state.perPage));
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
