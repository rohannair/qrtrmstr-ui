// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

// Styles
import styles from '../UserList/userList.css';

// Containers
import { getSurveys } from '../../actions/surveyViewActions';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';

class SurveyView extends Component {
  componentWillMount() {
    this._renderSurveyList();
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
                <th/>
              </tr>
            </thead>
            <tbody>
            {
              [...this.props.surveyList.surveys]
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
};

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    surveyList: state.surveyList
  };
}
export default connect(mapStateToProps)(SurveyView);

