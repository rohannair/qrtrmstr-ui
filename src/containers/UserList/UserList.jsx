import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './userList.css';
import Cookies from 'cookies-js';
import { Modal } from 'react-bootstrap';

import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import NewUserModal from '../../components/NewUserModal';

import { getUsers, createUser, newUserErrors, getRoles } from '../../actions/userActions';

class UserList extends Component {

  state = {
    newUser: {},
    loading: false,
    errorMessage: this.props.errorMessage || null
  };

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  componentWillMount() {
    this._renderUserList();
    this._renderRolesList();
  };

  componentWillReceiveProps(nextProps) {
    const { newUser, errorMessage } = this.state;
    this.setState({
      loading: false,
      newUser: nextProps.errorMessage ? newUser : {},
      errorMessage: nextProps.errorMessage
    });
  }

  render() {
    const newUserForm = Object.keys(this.state.newUser).length > 0 || this.state.errorMessage
    ? <NewUserModal
        val={this.state.newUser}
        showModal={true}
        renderModal={this._renderNewUserModal}
        submitNewUser={this._addNewUser}
        onChange={this._changeUserParams}
        closeModal={this._closePlaybookModal}
        loading={this.state.loading}
        errorMessage={this.state.errorMessage}
        roles={this.props.roles}
        chosenRole={this.state.newUser.role_id}
      />
    : null;

    const userData = Object.keys(this.props.users).map(value => {
      let val = this.props.users[value];
      const adminIcon = val.isAdmin
        ? <i className="oi" data-glyph="key" />
        : null;

      const deactivateClasses = val.isAdmin
        ? 'disabled'
        : null;

      return (
        <tr key={val.id} className="userList-option">
          <td className="checkbox"><input type="checkbox" /></td>
          <td className="name">{ `${val.first_name} ${val.last_name}` }{ adminIcon }</td>
          <td>{ val.username }</td>
          <td>{ val.rolename }</td>
          <td className="actions">
            <ButtonGroup>
              <Button
                classes='sm tertiary'
                icon="pencil" />
              <Button
                classes= { `sm tertiary ${deactivateClasses}` }
                disabled={val.isAdmin}
                icon="times"/>
              <Button
                classes='secondary sm'
                icon="paper-plane"/>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData}
            </tbody>
          </table>
        </Card>

        <Card>
          <div className="userList-actionBar">
            <Button onClick={this._renderNewUserModal} classes="primary md">New user +</Button>
          </div>
        </Card>
        <div className="modalContainer">
          { newUserForm }
        </div>
      </div>
    );
  };

  _clearUserErrors = () => {
    const { dispatch } = this.props;
    dispatch(newUserErrors(null));
  };

  _closePlaybookModal = () => {
    this.setState({
      newUser: {}
    });
    this._clearUserErrors();
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  };

  _renderRolesList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getRoles(token));
  };

  _renderNewUserModal = () => {
    const { token, dispatch, roles } = this.props;
    const { newUser } = this.state;
    this.setState({
      newUser: {
        password: 'password',
        first_name: '',
        last_name: '',
        personal_email: '',
        role_id: 'Choose A Role'
      },
      errorMessage: null
    });
  };

  _changeUserParams = (key, val) => {
    const { newUser } = this.state;
    if (key === 'personal_email') {
      this.setState({
        newUser: {
          ...newUser,
          [key]: val,
          username: val
        }
      });
    } else {
      this.setState({
        newUser: {
          ...newUser,
          [key]: val
        }
      });
    }
  };

  _addNewUser = () => {
    const { token, dispatch } = this.props;
    const { newUser } = this.state;
    this.setState({
      loading: true
    });
    dispatch(createUser(token, newUser));
  };
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    users: state.app.users,
    errorMessage: state.app.errorMessage,
    roles: state.app.roles
  };
}
export default connect(mapStateToProps)(UserList);
