// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

// Styles
import styles from './surveyView.css';

// Containers
import { getSurveys, sendSurvey, duplicatePlaybook } from '../../actions/surveyViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import SendSurveyModal from '../../components/SendSurveyModal';
import SurveyViewItem from '../../components/SurveyViewItem';

class SurveyView extends Component {

  state = {
    chosenUser: {},
    chosenSurvey: {},
    editedSurvey: {}
  };

  componentWillMount() {
    this._renderSurveyList();
    this._renderUserList();
  };

  render() {
    const surveyModal = Object.keys(this.state.chosenSurvey).length > 0
    ? <SendSurveyModal
        surveyName={this.state.chosenSurvey.name}
        surveyID={this.state.chosenSurvey.id}
        users={this.props.users}
        showModal={true}
        closeModal={this._closeSendSurveyModal}
        sendSurvey={this._sendSurvey}
        onChange={this._changeUserParams}
        latestUser={this.state.chosenUser}
      />
    : null;

    const items = [...this.props.surveyList].map(val => <SurveyViewItem key={val.id} {...val} onShowModal={ this._selectSurveyForSending } duplicate={ this._duplicatePlaybook } />);

    return (
      <div className="surveyView">
        <div className="surveyView-header">
          <div className="cell checkbox"><input type="checkbox" /></div>
          <div className="cell name">Name</div>
          <div className="cell modified">Last Modified</div>
          <div className="cell collaborators">Collaborators</div>
          <div className="cell status">Status</div>
          <div className="cell actions">Actions</div>
        </div>

        { items }
        { surveyModal }
      </div>
    );
  };

  _selectSurveyForSending = (val) => {
    const chosenSurvey = ([...this.props.surveyList].filter(item => item.id === val.id))[0];
    this.setState({
      chosenSurvey
    });
  };

  _renderSurveyList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getSurveys(token));
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  };

  _closeSendSurveyModal = () => {
    this.setState({
      chosenSurvey: {}
    });
  };

  _sendSurvey = () => {
    this._closeSendSurveyModal();
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    return dispatch(sendSurvey(token, chosenUser));
  };

  _duplicatePlaybook = (id) => {
    const { token, dispatch } = this.props;
    return dispatch(duplicatePlaybook(token, id));
  }

  _changeUserParams = (value) => {
    this.setState({
      chosenUser: {
        userId: value.id,
        token: null,
        firstName: value.first_name,
        lastName: value.last_name,
        email: value.email,
        companyName: 'Scotiabank',
        surveyId: value.surveyID,
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
    showModal: state.surveyAdmin.showModal,
    token,
    surveyList: state.surveyAdmin.list,
    users: state.app.users
  };
};
export default connect(mapStateToProps)(SurveyView);

