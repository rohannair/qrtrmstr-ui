import React, { Component, PropTypes } from 'react';
import styles from './userList.css';

import Card from '../../components/Card';

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
    this.props.renderList();
  }

  render() {
    const userData = [...this.props.data].map(val => {
      return (
        <tr key={val.id} className="userList-option">
          <td className="checkbox"><input type="checkbox" /></td>
          <td className="name">{ `${val.first_name} ${val.last_name}` }</td>
          <td>{ val.email }</td>
          <td>{ (val.isAdmin).toString() }</td>
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
                <th>Is Admin?</th>
              </tr>
            </thead>
            <tbody>
              {userData}
            </tbody>
          </table>
        </Card>

        <Card>
          <div className="userList-actionBar">
            <button>Invite new user +</button>
          </div>
        </Card>
      </div>
    );
  }
}

export default UserList;
