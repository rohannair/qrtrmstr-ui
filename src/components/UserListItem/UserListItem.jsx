import React, {Component} from 'react';
import styles from './userListItem.css';


class UserListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      is_admin: this.props.is_admin,
      profile_img: this.props.profile_img,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      username: this.props.username,
      rolename: this.props.rolename,

    };
  }

  <UserListItem
    key={index}
    id={row.id}
    is_admin={row.is_admin}
    profile_img={row.profile_img || ''}
    firstName={row.firstName}
    lastName={row.lastName}
    username={row.username}
    rolename={row.rolename}
  />

  render() {

    const { profile_img, firstName, lastName, is_admin, username , rolename } = this.state;

    const admin_pill = is_admin ? <span className="admin">Admin</span> : '';
    const deactivateClasses = is_admin ? 'disabled' : null;


    return (
      <div className="table-row">
        <div className="cell name">
          <div className="profile-img">
            <img src={profile_img} alt=""/>
          </div>

          { `${firstName} ${lastName}` } { admin_pill }
        </div>

        <div className="cell email">
          <a href={`mailto:${username}`}>{username}</a>
        </div>

        <div className="cell role">
          { rolename }
        </div>

        <div className="cell actions">
          <ButtonGroup>
            <Button
              classes='sm tertiary'
              icon="pencil" />
            <Button
              classes= { `sm tertiary ${deactivateClasses}` }
              disabled={is_admin}
              onClick={this._deleteUser}
              icon="times"/>
          </ButtonGroup>
        </div>
      </div>
    );
  }

}

export default UserListItem;
