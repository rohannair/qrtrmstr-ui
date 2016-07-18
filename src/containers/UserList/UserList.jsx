import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './userList.css';
import Cookies from 'cookies-js';
import ReactPaginate from 'react-paginate';

import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import NewUserModal from '../../components/NewUserModal';
import UserListItem from '../../components/UserListItem';
import NewRoleModal from '../../components/NewRoleModal';

import Table from '../../components/Table';

import {
  getUsers,
  createUser,
  createRole,
  newUserErrors,
  getRoles,
  linkAccount,
  deleteUser
} from '../../actions/userActions';

class UserList extends Component {
  state = {
    newUser: {},
    newRole: {},
    loading: false,
    errorMessage: this.props.errorMessage || null,
    offset: 0,
    pageNum: 1,
    perPage: 10
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
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
    if (nextProps.authUrl) {
      window.location = nextProps.authUrl;
    }

    const { newUser, newRole, errorMessage } = this.state;
    this.setState({
      loading: false,
      newUser: nextProps.errorMessage ? newUser : {},
      errorMessage: nextProps.errorMessage,
      newRole: nextProps.errorMessage ? newRole : {}
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
        closeModal={this._closeUserModal}
        loading={this.state.loading}
        errorMessage={this.state.errorMessage}
        roles={this.props.roles}
        chosenRole={this.state.newUser.role_id}
      />
    : null;

    const newRoleForm = Object.keys(this.state.newRole).length > 0 || this.state.errorMessage
    ? <NewRoleModal
        val={this.state.newRole}
        showModal={true}
        renderModal={this._renderNewRoleModal}
        submitNewRole={this._addNewRole}
        onChange={this._changeRoleParams}
        closeModal={this._closeRoleModal}
        loading={this.state.loading}
        errorMessage={this.state.errorMessage}
      />
    : null;

    const tableBody = this.props.users.results.map((row, i) => {
      return (
        <UserListItem
          key={i}
          { ...row }
          deleteUser={this._deleteUser}
        />
      );
    });

    return (
      <div className="userList">
      <div className="userList-actionBar">
        <Button onClick={this._renderNewRoleModal} classes="primary md">New Role +</Button>
        <Button onClick={this._renderNewUserModal} classes="primary md">New User +</Button>
      </div>

        <Table headings = {['name', 'email', 'role', 'actions']} >
          { tableBody }
          <div className="userList-metadata">
            {`Total users: ${this.props.users.total}`}
            <div id="paginate">
              <ReactPaginate
                previousLabel=" "
                nextLabel=" "
                breakLabel={<a href="">...</a>}
                pageNum={Math.ceil(this.props.users.total / this.state.perPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                clickCallback={this._handlePageClick}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
                previousLinkClassName="fa fa-arrow-left tertiary"
                nextLinkClassName="fa fa-arrow-right tertiary"
              />
            </div>
          </div>
        </Table>

        <div className="modalContainer">
          { newUserForm }
          { newRoleForm }
        </div>
      </div>
    );
  };

  _clearUserErrors = () => {
    const { dispatch } = this.props;
    dispatch(newUserErrors(null));
  };

  _closeUserModal = () => {
    this.setState({
      newUser: {}
    });
    this._clearUserErrors();
  };

  _closeRoleModal = () => {
    this.setState({
      newRole: {}
    });
    this._clearUserErrors();
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    const { offset, perPage } = this.state;
    return dispatch(getUsers(token, offset, perPage));
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
        role_id: '',
        is_admin: false
      },
      errorMessage: null
    });
  };

  _renderNewRoleModal = () => {

    this.setState({
      newRole: {
        name: ''
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

  _changeRoleParams = (name) => {
    this.setState({
      newRole: {
        name: name
      }
    });
  };

  _validateField = (val) => !!val;

  _addNewUser = () => {
    this.setState({
      loading: true
    }, this._processNewUser());
  };

  _addNewRole = () => {
    this.setState({
      loading: true
    }, this._processNewRole());
  };

  _processNewRole = () => {
    const { token, dispatch } = this.props;
    return dispatch(createRole(token, this.state.newRole));
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
      username: newUser.personal_email,
      password: `${newUser.first_name.toLowerCase()}123`
    };

    allErrors += formErrors ? `The fields: ${formErrors}cannot be blank. ` : '';
    allErrors.length > 0 ? dispatch(newUserErrors(allErrors)) : dispatch(createUser(token, data));
  };

  _deleteUser = (id, firstName, lastName) => {
    const { token, dispatch } = this.props;
    const deleteConfirm = confirm(`Are you sure you want to delete ${firstName} ${lastName}?`);
    if (deleteConfirm) dispatch(deleteUser(token, id));
  }

  _handlePageClick = (data) => {
    const offset = Math.ceil(data.selected * this.state.perPage);
    this.setState({ offset });
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token, offset, this.state.perPage));
  };

  _googleAuth = () => {
    const { token, dispatch } = this.props;
    // dispatch(linkAccount(token, 'google'));
    console.log('Coming Soon');
  };

  _slackAuth = () => {
    const { token, dispatch } = this.props;
    // dispatch(linkAccount(token, 'slack'));
    console.log('Coming Soon');
  };

  _linkedInAuth = () => {
    const { token, dispatch } = this.props;
    // dispatch(linkAccount(token, 'linkedIn'));
    console.log('Coming Soon');
  };

}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    users: state.app.users,
    errorMessage: state.app.errorMessage,
    roles: state.app.roles,
    authUrl: state.app.authUrl
  };
}
export default connect(mapStateToProps)(UserList);
