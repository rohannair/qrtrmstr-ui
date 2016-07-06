import React, { Component, PropTypes } from 'react';
import styles from './playbookListItem.css';
import { Link } from 'react-router';
import moment from 'moment';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Pill from '../Pill';

class PlaybookListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenUser: {},
      name: this.props.name || 'Unnamed',
      editingName: false
    };
  }

  render() {
    const href = `/playbook/${this.props.id}`;
    const assignedTo = this.props.firstName ? `${this.props.firstName} ${this.props.lastName}` : 'Unassigned';
    const deactivateClasses = this.props.current_status === 'draft' ? '' : 'disabled';

    const canOpen = this.props.showSendModal.bind(this,
        { id: this.props.id, name: this.props.name}
    );

    const currentStatusDisplay = this.props.current_status === 'in progress'
    ? <Pill info>{`${this.props.percent_submitted * 100}% Done`}</Pill>
    : <Pill warning>{this.props.current_status}</Pill>;

    const viewSubPlaybookBtn = this.props.current_status === 'in progress'
    ? <Link to={`/dashboard/playbook/results/${this.props.id}`}>
        <i className="fa fa-eye"></i>
      </Link>
    : null;

    const editPlaybookButton = this.props.current_status === 'draft'
    ? <Link to={`/dashboard/playbooks/edit/${this.props.id}`}>
        <Button
          classes={'primary sm'}
        >Edit</Button>
      </Link>
    : <Button
        classes={`primary sm ${deactivateClasses}`}
        icon="cog"
        toolTipText="Edit Playbook"
      />;

    const name = this.state.editingName
    ? <input value={this.state.name} />
    : <span onClick={(e) => this.setState({editingName: !this.state.editingName})}>{this.state.name}</span>;

    // this.props.showEditModal.bind(this, { id: this.props.id, name: this.props.name} );

    return (
      <div key={ this.props.id } className="playbookListItem">
         <div className="main">
          <div className="name">
            { /* <Button
              onClick={(e) => this.setState({editingName: !this.state.editingName})}
              classes= {
                this.state.editingName
                ? 'success sm'
                : `transparent sm ${deactivateClasses}`
              }
              icon={
                this.state.editingName
                ? 'check'
                : 'pencil'
              }
            /> */}
            { name }
          </div>

          <div className="meta">
            { currentStatusDisplay }
            <div className="assigned">
              <strong>Assigned to: </strong>
              { assignedTo }
            </div>
            <div className="assigned">
              <strong>Created: </strong>
              { moment(this.props.created_at).format('MMMM D') }
            </div>
            <div className="assigned">
              <strong>Last Modified: </strong>
              { moment(this.props.updated_at).fromNow() /* .format('MMMM D @ h:MM A')*/ }
            </div>
              { /* <Button
                onClick={ this.props.showAssignModal.bind(this,
                  { id: this.props.id, name: this.props.name}
                ) }
                classes={`transparent sm  ${deactivateClasses}`}
                icon="user"
                toolTipText="Assign Playbook"
              />*/ }
          </div>
        </div>

        <div className="actions">
          <div className="status">
            { viewSubPlaybookBtn }
          </div>
          <ButtonGroup>

            <Button
              onClick={ this.props.duplicatePlaybook.bind(this, this.props.id) }
              classes='inverse sm'
              icon="copy"
              toolTipText="Duplicate Playbook"
            />

            { editPlaybookButton }

            <Button
              onClick={ canOpen }
              classes={`tertiary sm  ${deactivateClasses}`}
            >Send</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  _sendPlaybook = (userID) => {
    let assignedUser = null;

    if (this.props.assigned) {
      const assignedUserOrg = this.props.users.filter(val => val.id === userID)[0];
      assignedUser = {
        id: assignedUserOrg.id,
        firstName: assignedUserOrg.firstName,
        lastName: assignedUserOrg.lastName,
        email: assignedUserOrg.username,
        playbookID: this.props.id };
    }

    this.props.sendPlaybook(assignedUser);
  };

};

export default PlaybookListItem;
