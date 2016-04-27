import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './userList.css';
import Cookies from 'cookies-js';
import { Modal } from 'react-bootstrap';

import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import NewUserModal from '../../components/NewUserModal';

import { getUsers, createUser } from '../../actions/userActions';

class UserList extends Component {

  state = {
    newUser: this.props.newUser || {}
  };

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  componentWillMount() {
    this._renderUserList();
  };

  render() {
    const newUserForm = Object.keys(this.state.newUser).length > 0
    ? <NewUserModal
        val={this.state.newUser}
        showModal={true}
        renderModal={this._renderNewUserModal}
        submitNewUser={this._addNewUser}
        onChange={this._changeUserParams}
        closeModal={this._closeSurveyModal}

      />
    : null;

    const userData = Object.keys(this.props.users).map(value => {
      let val = this.props.users[value];
      const adminIcon = val.isAdmin
        ? <i className="oi" data-glyph="key" />
        : null;

      const resultsIcon = val.survey_results
        ? (
            <Button
              classes="inverse sm"
              // toolTipText="View survey results"
              icon="list-rich" />
          )
        : (
            <Button
              classes="primary sm"
              icon="share-boxed" />
          );

      const deactivateClasses = val.isAdmin
        ? 'disabled'
        : null;

      return (
        <tr key={val.id} className="userList-option">
          <td className="checkbox"><input type="checkbox" /></td>
          <td className="name">{ `${val.first_name} ${val.last_name}` }{ adminIcon }</td>
          <td>{ val.username }</td>
          <td>{ val.department_name }</td>
          <td className="actions">
            <ButtonGroup>
              { resultsIcon }
              <Button
                classes='sm tertiary'
                icon="pencil" />
              <Button
                classes= { `sm tertiary ${deactivateClasses}` }
                disabled={val.isAdmin}
                icon="x"/>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    const userCount = Object.keys(this.props.users).length;

    return (
      <div className="userList">
        <Card>
          <div>Search</div>
        </Card>

        <Card noPadding={true}>
          <div className="userList-metadata">
            {`${userCount} users`}
          </div>
          <table>
            <thead>
              <tr className="userList-header">
                <th className="checkbox"><input type="checkbox" /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {console.log("userData", userData)}
              {userData}
            </tbody>
          </table>
        </Card>

        <Card>
          <div className="userList-actionBar">
            <Button onClick={this._renderNewUserModal} classes="primary md">New user +</Button>
          </div>
        </Card>
          { newUserForm }
        </div>
    );
  };

  _closeSurveyModal = () => {
    this.setState({
      newUser: {}
    });
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  };

  _renderNewUserModal = () => {
    const { token, dispatch } = this.props;
    const { newUser } = this.state;
    this.setState({
      newUser: {
        first_name: '',
        last_name: '',
        email: '',
        work_email: ''
      }
    });
  };


  _changeUserParams = (key, val) => {
    const { newUser } = this.state;
    this.setState({
      newUser: {
        ...newUser,
        [key]: val
      }
    });
  };

  _addNewUser = () => {
    this._closeSurveyModal();
    const { token, dispatch } = this.props;
    const { newUser } = this.state;
    return dispatch(createUser(token, newUser));
  };
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    users: state.app.users
  };
}
export default connect(mapStateToProps)(UserList);
