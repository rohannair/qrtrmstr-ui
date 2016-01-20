import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './userList.css';
import Cookies from 'cookies-js';

import Card from '../../components/Card';
import Button from '../../components/Button';

import { getUsers } from '../../actions/userActions';

class UserList extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  static defaultProps = {
    data: {}
  };

  state = {

  };

  componentWillMount() {
    this._renderUserList();
  };

  render() {
    const userData = [...this.props.users].map(val => {
      let adminIcon = val.isAdmin
        ? <i className="oi" data-glyph="key" />
        : null;
      return (
        <tr key={val.id} className="userList-option">
          <td className="checkbox"><input type="checkbox" /></td>
          <td className="name">{ ` ${val.first_name} ${val.last_name}` }{ adminIcon }</td>
          <td>{ val.email }</td>
          <td>{ val.department_name }</td>
          <td className="actions">
            <button>Edit</button>
            <button
              className={val.isAdmin ? 'disabled' : null}
              disabled={val.isAdmin}>
              Deactivate
            </button>
          </td>
        </tr>
      );
    });

    const userCount = [...this.props.data].length;

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
                <th>Department</th>
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
            <Button classes="primary md">Invite new user +</Button>
          </div>
        </Card>
      </div>
    );
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
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
