import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './userList.css';
import Cookies from 'cookies-js';

import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import NewUserModal from '../../components/NewUserModal';

import Table from '../../components/Table';

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
  };

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

    const userCount = Object.keys(this.props.users).length;

    const tableBody = this.props.users.map(row => {

      const profile_img = row.profile_img || '';
      const admin_pill = row.is_admin
      ? <span className="admin">Admin</span>
      : '';
      const deactivateClasses = row.is_admin
      ? 'disabled'
      : null;

      return (
        <div key={ row.id } className="table-row">
          <div className="cell name">
            <div className="profile-img">
              <img src={row.profile_img} alt=""/>
            </div>

            { `${row.first_name} ${row.last_name}` } { admin_pill }
          </div>

          <div className="cell email">
            <a href={`mailto:${row.username}`}>{row.username}</a>
          </div>

          <div className="cell role">
            { row.rolename }
          </div>

          <div className="cell actions">
            <ButtonGroup>
              <Button
                classes='sm tertiary'
                icon="pencil" />
              <Button
                classes= { `sm tertiary ${deactivateClasses}` }
                disabled={row.is_admin}
                icon="times"/>
            </ButtonGroup>
          </div>
        </div>
      );
    });

    return (
      <div className="userList">
        <Table headings = {['name', 'email', 'role', 'actions']} >
          { tableBody }
          <div className="userList-metadata">
            {`${userCount} users`}
          </div>
        </Table>

        <div className="userList-actionBar">
          <Button onClick={this._renderNewUserModal} classes="primary md">New user +</Button>
        </div>

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
        first_name: '',
        last_name: '',
        personal_email: '',
        role_id: ''
      },
      errorMessage: null
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

  _validateField = (val) => !!val;

  _addNewUser = () => {
    this.setState({
      loading: true
    }, this._processNewUser());
  };

  _processNewUser = () => {
    const { token, dispatch } = this.props;
    const { newUser } = this.state;
    let allErrors = '';
    let formErrors = '';

    for (let val in newUser) {
      if (newUser[val].length === 0) {
        if (val === 'role_id') {
          val = 'role';
        } if (val === 'personal_email') {
          val = 'email';
        }

        let valProc = val.replace(/_/g, ' ');
        formErrors += `${valProc}, `;
      }

      if (val === 'personal_email') {
        allErrors += (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(newUser[val]) ? ''
        : 'Please enter a valid email address. ';
      }
    };

    const data = {
      ...newUser,
      is_admin: false,
      username: newUser.personal_email,
      password: 'password'
    };

    allErrors += formErrors ? `The fields: ${formErrors}cannot be blank. ` : '';
    allErrors.length > 0 ? dispatch(newUserErrors(allErrors)) : dispatch(createUser(token, data));
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
