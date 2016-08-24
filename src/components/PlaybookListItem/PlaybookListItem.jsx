import React, { Component, PropTypes } from 'react';
import styles from './playbookListItem.css';

import { Link } from 'react-router';
import classNames from 'classnames';
import moment from 'moment';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Indicator from '../Indicator';
import Tooltip from '../Tooltip';

class PlaybookListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenUser: {},
      name: this.props.name || 'Unnamed',
      editingName: false,
      showTooltip: false
    };
  }

  static defaultProps = {
    users: []
  }

  static propTypes = {
    users: PropTypes.array
  }

  render() {
    const {
      assigned,
      cancelScheduledPlaybook,
      clearAssigned,
      current_status,
      id,
      name,
      percent_submitted,
      showAssignModal,
      users,
    } = this.props;

    const playbookSent = current_status !== 'draft';
    const playbookScheduled  = current_status === 'scheduled';
    const assignedUser = users.filter(val => val.id === assigned)[0] || {
      firstName: 'Unknown',
      lastName: 'User'
    };

    const assignedName = assigned
    ? `${assignedUser.firstName} ${assignedUser.lastName}`
    : 'Unassigned';

    const unAssignAction = assigned
    ? <Button onClick={ clearAssigned.bind(this, id) } classes="sm transparent">&times;</Button>
    : null;

    const btnClickHandler = showAssignModal.bind(this,
      { id, name: name }
    );

    const assignedTo = playbookSent
    ? <div>{assignedName}</div>
    : (
        <span className="flex row">
          <div className="editable" onClick={btnClickHandler}>
            { assignedName }
          </div>
          { unAssignAction }
        </span>
      );

    const deactivateClasses = current_status === 'draft'
    ? ''
    : 'hidden';

    const canOpen = this.props.showSendModal.bind(this, { id, name});

    const viewSubPlaybookBtn = () => {
      switch (current_status) {
      case 'in progress':
      case 'sent':
      case 'in progress':
        return (
          <ButtonGroup>
            <Link to={`/dashboard/playbook/results/${id}`} className="btn inverse sm">
              View Results
              <span>{` (${percent_submitted * 100}%)`}</span>
            </Link>
            <Button
              onClick={ () => this.props.reSendPlaybook(this.props.id, this.props.assigned) }
              classes={'tertiary sm'}
            >Re-Send</Button>
          </ButtonGroup>
        );

      case 'scheduled':
        return (
          <Button
            onClick={ () => cancelScheduledPlaybook(this.props.id) }
            classes={'tertiary sm'}
          >Cancel</Button>
        );

      default:
        return (
          <span>
            <Link to={`/dashboard/playbooks/edit/${id}`} className={'btn primary sm'}>Edit</Link>
            <Button
              onClick={ canOpen }
              classes={'tertiary sm'}
            >Send Now</Button>
            <Button
              onClick={ this.props.showScheduleModal.bind(this, { id, name }) }
              classes='inverse sm'
              toolTipText="Schedule Playbook"
            >Schedule</Button>
          </span>
        );
      };
    };

    const scheduledNotification = playbookScheduled
    ? <div className="section"> <strong>Scheduled For:</strong> { moment(+this.props.scheduledFor).format('dddd, MMMM Do YYYY, h:mm a') }</div>
    : null;

    const playbookName = this.state.editingName && !playbookSent
    ? (
        <div className="editPlaybookName" >
          <input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Button
            classes={'primary sm'}
            icon="check"
            onClick={this._savePlaybookName}
          />
        </div>
      )
    : (
        <div className="playbookName" onClick={(e) => this.setState({editingName: !this.state.editingName})}>
          <span >{this.state.name}</span>
        </div>
      );

    return (
      <div key={ this.props.id } className="playbookListItem">
         <div className="main">
          <div className="name">{ playbookName }</div>

          <div className="meta">
            <div className="section">
              <strong>Assigned to: </strong>
              { assignedTo }
            </div>
            <div className="section">
              <strong>Created: </strong>
              { moment(this.props.created_at).format('MMMM D, YYYY') }
            </div>
            <div className="section">
              <strong>Last Modified: </strong>
              { moment(this.props.updated_at).fromNow() }
            </div>
            { scheduledNotification }
          </div>
        </div>

        <div className="actions">
          <ButtonGroup>
            <Button
              onClick={ this.props.duplicatePlaybook.bind(this, this.props.id) }
              classes='inverse sm'
              icon="copy"
              toolTipText="Duplicate Playbook"
            />
             { viewSubPlaybookBtn() }

          </ButtonGroup>
          <Indicator
            info={current_status === 'sent'}
            success={current_status === 'in progress'}
            warning={current_status === 'draft'}
            danger={current_status === 'scheduled'}
            onHover={ this._showTooltip }
            onOut={ this._hideTooltip }
          >
            {
              this.state.showTooltip
              ? <Tooltip>{current_status}</Tooltip>
              : null
            }
          </Indicator>
        </div>
      </div>
    );
  };

  _savePlaybookName = (e) => {
    this.props.savePlaybook(this.props.id, {
      name: this.state.name
    });
    this.setState({ editingName: !this.state.editingName });
  };

  _showTooltip = () => {
    this.setState({
      showTooltip: true
    });
  };

  _hideTooltip = () => {
    this.setState({
      showTooltip: false
    });
  };

  _sendPlaybook = (userID) => {
    let assignedUser = null;

    if (assigned) {
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
