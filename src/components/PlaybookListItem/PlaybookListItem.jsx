import React, { Component, PropTypes } from 'react';
import styles from './playbookListItem.css';
import { Link } from 'react-router';
import moment from 'moment';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

class PlaybookListItem extends Component {

  state = {
    chosenUser: {}
  };

  render() {
    const href = `/playbook/${this.props.id}`;
    const assignedTo = this.props.firstName ? `${this.props.firstName} ${this.props.lastName}` : ' ';
    const  deactivateClasses = this.props.current_status === 'draft' ? '' : 'disabled';

    const canOpen = this.props.showSendModal.bind(this,
        { id: this.props.id, name: this.props.name}
    );

    const currentStatusDisplay = this.props.current_status === 'in progress'
    ? `${this.props.current_status} (${this.props.percent_submitted})
      ${<Link to={`/dashboard/playbooks/results/${this.props.id}`}>
        <i className="fa fa-eye"></i>
      </Link>}`
    : this.props.current_status;

    const editPlaybookButton = this.props.current_status === 'draft' ?
      <Link to={`/dashboard/playbooks/edit/${this.props.id}`}>
        <Button
          classes={'primary sm'}
          icon="cog"
          toolTipText="Edit Playbook"
        />
      </Link>
    : <Button
        classes={`primary sm ${deactivateClasses}`}
        icon="cog"
        toolTipText="Edit Playbook"
      />;

    return (
      <div key={ this.props.id } className="playbookListItem">
        <div className="cell checkbox"><input type="checkbox" /></div>

        <div className="cell name">
          { `${this.props.name}  `}

          <Link to={`/playbook/${this.props.id}`}>
            <i className="fa fa-external-link"></i>
          </Link>
        </div>

        <div className="cell modified">
          { moment(this.props.updated_at).format('YYYY-MM-DD h:mma') }
        </div>

        <div className="cell assigned assigned-text">
          { assignedTo }
        </div>

        <div className="cell collaborators">
        </div>

        <div className="cell status">
          { currentStatusDisplay }
        </div>

        <div className="cell actions">
          <ButtonGroup>
            <Button
              onClick={ this.props.showEditModal.bind(this,
                { id: this.props.id, name: this.props.name}
              ) }
              classes= {`inverse sm ${deactivateClasses}`}
              icon="pencil"
              toolTipText="Edit Name"
            />

            <Button
              onClick={ this.props.duplicatePlaybook.bind(this, this.props.id) }
              classes='inverse sm'
              icon="copy"
              toolTipText="Duplicate Playbook"
            />

            <Button
              onClick={ this.props.showAssignModal.bind(this,
                { id: this.props.id, name: this.props.name}
              ) }
              classes={`inverse sm  ${deactivateClasses}`}
              icon="user"
              toolTipText="Assign Playbook"
            />

            { editPlaybookButton }

            <Button
              onClick={ canOpen }
              classes={`secondary sm  ${deactivateClasses}`}
              icon="paper-plane"
              toolTipText="Send to User"
            />
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
        first_name: assignedUserOrg.first_name,
        last_name: assignedUserOrg.last_name,
        email: assignedUserOrg.username,
        playbookID: this.props.id };
    }

    this.props.sendPlaybook(assignedUser);
  };


};

export default PlaybookListItem;
