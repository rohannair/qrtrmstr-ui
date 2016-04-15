// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

// Styles
import styles from '../UserList/userList.css';

// Containers
import { getSurveys, sendSurveyModal, sendSurvey } from '../../actions/surveyViewActions';
import { getUsers } from '../../actions/userActions';


// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import SendSurveyModal from '../../components/SendSurveyModal';


class SurveyView extends Component {

  state = {
    chosenUser: this.props.chosenUser || {}
  };

  componentWillMount() {
    this._renderSurveyList();
    this._renderUserList();
  }

  render() {
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

                <th/>
              </tr>
            </thead>
            <tbody>
            {
              [...this.props.surveyList]
              .map(val => {
                return (
                  <tr key={val.id} className="userList-option">
                    <td className="checkbox"><input type="checkbox" /></td>
                    <td>{val.name} <a href="/survey" target="_blank">(Preview)</a></td>
                    <td>{moment(val.created_at).fromNow()}</td>
                    <td>{moment(val.updated_at).fromNow()}</td>
                    <td>
                      <Link to={`/dashboard/surveys/edit/${val.id}`}>
                        <Button classes='inverse sm'>Edit</Button>
                      </Link>
                    </td>
                    <td>
                      <div className="userList-actionBar">
                          <Button onClick={this._renderSendSurveyModal} classes="primary md">Send To User</Button>  
                      </div>
                      <SendSurveyModal surveyID={val.id} val={this.props.users} showModal={this.props.showModal} toggleModal={this._renderSendSurveyModal} sendSurvey={this._sendSurvey} onChange={this._changeUserParams} />
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </Card>

      </div>
    );
  }

  _renderSurveyList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getSurveys(token));
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  };

  // _renderPreSendSurvey = (survey) => {
  //   this._renderSendSurveyModal();
  //   this.setState({
  //     chosenSurvey: survey
  //   });
  // }

  _renderSendSurveyModal = () => {
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    // this.setState({
    //   newUser: {}
    // });
    return dispatch(sendSurveyModal());
  };

  _sendSurvey = () => {
    this._renderSendSurveyModal();
    const { token, dispatch } = this.props;
    const { chosenUser } = this.state;
    return dispatch(sendSurvey(token, chosenUser))
  };

  _changeUserParams = (value) => {
    console.log("VALUEEEEEEEE", value, value.userId)
    const userInfo = value.split(",");
    console.log(userInfo)

    const { chosenUser } = this.state;
    this.setState({
      chosenUser: {
        userId: userInfo[0],
        token: null,
        firstName: userInfo[1],
        lastName: userInfo[2],
        email: userInfo[3],
        companyName: "Scotia Bank",
        surveyId: "1e9eddbc-7ede-43fd-9bde-364bba4d84e9",
        emailTemplate: "welcomeEmail"
      }
    });
  };
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

