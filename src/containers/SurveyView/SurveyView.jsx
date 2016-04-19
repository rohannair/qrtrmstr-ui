// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

// Styles
import styles from '../UserList/userList.css';

// Containers
import { getSurveys, sendSurvey } from '../../actions/surveyViewActions';
import { getUsers } from '../../actions/userActions';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import SendSurveyModal from '../../components/SendSurveyModal';
import SurveyViewItem from '../../components/SurveyViewItem';


class SurveyView extends Component {

  state = {
    chosenUser: this.props.users[(this.props.users.length)-1] || {},
    chosenSurvey: {}
  };

  componentWillMount() {
    this._renderSurveyList();
    this._renderUserList();
  }

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

    const items = [...this.props.surveyList].map(val => <SurveyViewItem key={val.id} {...val} onShowModal={ this._selectSurveyForSending } />);

    return (
      <div className="userList">
        <Card>
          <div>Search</div>
        </Card>

        <Card noPadding={true}>
          <table>
            <thead>
              <tr className="userList-header">
                <th className="checkbox"><input type="checkbox" /></th>
                <th>Name</th>
                <th>Created</th>
                <th>Last Modified</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              { items }
            </tbody>
          </table>
        </Card>
        { surveyModal }
      </div>
    );
  }

  _selectSurveyForSending = (val) => {
    const chosenSurvey = ([...this.props.surveyList].filter(item => item.id === val.id))[0]
    this.setState({
      chosenSurvey
    })
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
    })
  };

  _sendSurvey = () => {
    this._closeSendSurveyModal();
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    return dispatch(sendSurvey(token, chosenUser))
  };

  _changeUserParams = (value) => {
    this.setState({
      chosenUser: {
        userId: value.id,
        token: null,
        firstName: value.first_name,
        lastName: value.last_name,
        email: value.email,
        companyName: "Scotiabank",
        surveyId: value.surveyID, 
        emailTemplate: "welcomeEmail"
      }
    });
    const { chosenUser } = this.state;
  }
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    surveyList: state.surveyAdmin.list,
    users: state.app.users
  };
}
export default connect(mapStateToProps)(SurveyView);

