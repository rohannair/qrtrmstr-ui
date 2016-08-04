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
  schedulePlaybook,
  cancelPlaybookEmail,
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
import SchedulePlaybookModal from '../../components/SchedulePlaybookModal';
import EditPlaybookModal from '../../components/EditPlaybookModal';
import PlaybookListItem from '../../components/PlaybookListItem';

// Containers
import MapContainer from '../MapContainer';

class PlaybookList extends Component {

  state = {
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
        name: 'welcomeEmail'
      },
      {
        id: '2',
        name: 'generalEmail'
      }
    ]
  };

  componentWillMount() {
    const { token, dispatch } = this.props;
    const { offset, perPage } = this.state;

    // Select all playbooks
    dispatch(getPlaybooks(token, offset, perPage));
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

    const sendPlaybookModal = visibleModal === 'send'
    ? <AssignPlaybookModal
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
        emailTemplates={ this.state.emailTemplates }
        action={ this._savePlaybook }
        title={'Assign'}
      />
    : null;

    const items = [...this.props.playbookList.results].map(val => {
      return (<PlaybookListItem
        key={val.id}
        {...val}
        users={ this.props.users.results }
        sendPlaybook={ this._sendPlaybookToAssignedUser }
        duplicatePlaybook={ this._duplicatePlaybook }
        cancelScheduledPlaybook={ this._cancelScheduledPlaybook }
        showAssignModal={ this._showAssignModal }
        showSendModal={ this._showSendModal }
        showScheduleModal={ this._showScheduleModal }
        savePlaybook={ this._savePlaybook }
        clearAssigned={ this._clearAssigned }
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

  _sendPlaybook = (id, { selected }) => {
    const { token, dispatch } = this.props;

    const welcomeEmailParams = {
      userId: selected.id,
      firstName: selected.firstName,
      lastName: selected.lastName,
      email: selected.username,
      playbookId: id,
      emailTemplate: selected.emailTemplate
    };

    return dispatch(sendPlaybook(token, welcomeEmailParams));
  };

  _schedulePlaybook = (id, { selected }, sendAt) => {
    const { token, dispatch } = this.props;

    const welcomeEmailParams = {
      userId: selected.id,
      firstName: selected.firstName,
      lastName: selected.lastName,
      email: selected.username,
      playbookId: id,
      emailTemplate: selected.emailTemplate,
      sendAt
    };

    return dispatch(schedulePlaybook(token, welcomeEmailParams));
  };

  _cancelScheduledPlaybook = (id) => {
    const { token, dispatch } = this.props;
    const deleteCheck = confirm('Are you sure you want to cancel this scheduled email?');
    if (deleteCheck) return dispatch(cancelPlaybookEmail(token, { playbookId: id }));
  };

  _savePlaybook = (id, payload) => {
    const { token, dispatch } = this.props;
    console.log(payload);
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
        emailTemplate: 'welcomeEmail'
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
