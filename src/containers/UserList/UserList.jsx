import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './userList.css';
import Cookies from 'cookies-js';
import { Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import { getUsers, newUserModal } from '../../actions/userActions';

class UserList extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  componentWillMount() {
    this._renderUserList();
  };

  // open() {
  //   this.setState({ showModal: true });
  // };

  // close() {
  //   this.setState({ showModal: false });
  // };

  render() {
    let popover = <Popover title="popover">very popover. such engagement</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;
    const userData = [...this.props.users].map(val => {
      const adminIcon = val.isAdmin
        ? <i className="oi" data-glyph="key" />
        : null;

      const resultsIcon = val.survey_results
        ? (
            <Button
              classes="inverse sm"
              toolTipText="View survey results">
              <i className="oi" data-glyph="list-rich" />
            </Button>
          )
        : (
            <Button
              classes="primary sm"
              toolTipText="Send survey to user">
              <i className="oi" data-glyph="share-boxed" />
            </Button>
          );

      const deactivateClasses = val.isAdmin
        ? 'disabled'
        : null;

      return (
        <tr key={val.id} className="userList-option">
          <td className="checkbox"><input type="checkbox" /></td>
          <td className="name">{ `${val.first_name} ${val.last_name}` }{ adminIcon }</td>
          <td>{ val.email }</td>
          <td>{ val.department_name }</td>
          <td className="actions">
            <ButtonGroup>
              { resultsIcon }
              <Button
                classes='sm tertiary'>
                <i className="oi" data-glyph="pencil" />
              </Button>
              <Button
                classes= { `sm tertiary ${deactivateClasses}` }
                disabled={val.isAdmin}>
                <i className="oi" data-glyph="x" />
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    const userCount = [...this.props.users].length;

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
            <Button onClick={this._renderNewUserModal} classes="primary md">New user +</Button>
          </div>
        </Card>
          <Modal animation={true} show={this.props.showModal} onHide={this._renderNewUserModal}>
            <Card className="modal">
              <Modal.Header closeButton>
                <Modal.Title>Add a new user</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Text in a modal</h4>
                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                <h4>Popover in a modal</h4>
                <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                <h4>Tooltips in a modal</h4>
                <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                <hr />

                <h4>Overflowing text to show scroll behavior</h4>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this._renderNewUserModal}>Close</Button>
              </Modal.Footer>
            </Card>
          </Modal>
        </div>
    );
  };

  _renderUserList = () => {
    const { token, dispatch } = this.props;
    return dispatch(getUsers(token));
  };

  _renderNewUserModal = () => {
    const { token, dispatch } = this.props;
    return dispatch(newUserModal());
  };
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    showModal: state.app.showModal,
    token,
    users: state.app.users
  };
}
export default connect(mapStateToProps)(UserList);
