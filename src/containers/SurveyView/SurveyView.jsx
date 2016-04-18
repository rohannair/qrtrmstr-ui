// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';


// Styles
import styles from '../UserList/userList.css';

// Containers
import { getSurveys, toggleSurveyModal, sendSurvey } from '../../actions/surveyViewActions';
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

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.users.length > 0) {
  //     const latestUserProps = nextProps.users[(nextProps.users.length)-1]
  //     const latestUser = [latestUserProps.id, latestUserProps.first_name, latestUserProps.last_name, latestUserProps.email]
  //     this._changeUserParams(latestUser);
  //   }
  // }

  render() {
    const surveyModal = Object.keys(this.state.chosenSurvey).length > 0
    ? <SendSurveyModal 
        surveyName={this.state.chosenSurvey.name} 
        surveyID={this.state.chosenSurvey.id} 
        users={this.props.users} 
        showModal={true} 
        toggleModal={this._renderSendSurveyModal} 
        sendSurvey={this._sendSurvey} 
        onChange={this._changeUserParams} 
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

  _renderSendSurveyModal = () => {
    const { token, dispatch } = this.props;
    return dispatch(toggleSurveyModal());
  };

  _sendSurvey = () => {
    this._renderSendSurveyModal();
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;

    return dispatch(sendSurvey(token, chosenUser))
  };

  _processValue = (value) => {
    console.log("VALUE", value, typeof value)
    let userInfo = null
    if (typeof value == 'string') {
      userInfo = value.split(",");
      console.log(userInfo)
      return userInfo
    } else {
      userInfo = value
      console.log(userInfo)
      return userInfo
    }
  }

  _changeUserParams = (value) => {
    console.log("VALUEEEEEEEE", value, typeof value)
    const user = this._processValue(value);
    console.log(user);
    const { chosenUser } = this.state;
    // this.setState({
    //   chosenUser: {
    //     userId: user[0],
    //     token: null,
    //     firstName: user[1],
    //     lastName: user[2],
    //     email: user[3],
    //     companyName: "Scotiabank",
    //     surveyId: user[4], 
    //     // || "1e9eddbc-7ede-43fd-9bde-364bba4d84e9",
    //     emailTemplate: "welcomeEmail"
    //   }
    // });
    console.log(chosenUser)
  }
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    showModal: state.surveyAdmin.showModal,
    token,
    surveyList: state.surveyAdmin.list,
    users: state.app.users
  };
}
export default connect(mapStateToProps)(SurveyView);

