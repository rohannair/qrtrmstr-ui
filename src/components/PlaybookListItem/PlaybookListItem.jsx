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

  render() {
    const { current_status, id } = this.props;
    const playbookSent = current_status !== 'draft';
    const playbookScheduled  = current_status === 'scheduled';

    const assignedName = this.props.firstName
    ? `${this.props.firstName} ${this.props.lastName}`
    : 'Unassigned';

    const unAssignAction = this.props.firstName
    ? <Button onClick={ this.props.clearAssigned.bind(this, id) } classes="sm transparent">&times;</Button>
    : null;

    const btnClickHandler = this.props.showAssignModal.bind(this,
      { id, name: this.props.name}
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

    const canOpen = this.props.showSendModal.bind(this,
        { id: this.props.id, name: this.props.name}
    );

    const viewSubPlaybookBtn = playbookSent
    ? (!playbookScheduled
        ? <Link to={`/dashboard/playbook/results/${this.props.id}`} className="btn inverse sm">
          View Results
          <span>{` (${this.props.percent_submitted * 100}%)`}</span>
          </Link>
        : <Button
            onClick={ () => this.props.cancelScheduledPlaybook(this.props.id) }
            classes={'tertiary sm'}
          >Cancel</Button>)
    : <span>
        <Link to={`/dashboard/playbooks/edit/${this.props.id}`} className={'btn primary sm'}>Edit</Link>
        <Button
          onClick={ canOpen }
          classes={'tertiary sm'}
        >Send Now</Button>
        <Button
          onClick={ this.props.showScheduleModal.bind(this, { id: this.props.id, name: this.props.name}) }
          classes='inverse sm'
          toolTipText="Schedule Playbook"
        >Schedule</Button>
      </span>;

    const scheduledNotification = playbookScheduled
    ? <div className="section"> <strong>Scheduled For:</strong> { moment(+this.props.scheduledFor).format('dddd, MMMM Do YYYY, h:mm a') }</div>
    : null;

    const name = this.state.editingName && !playbookSent
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
          <div className="name">{ name }</div>

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
            { viewSubPlaybookBtn }
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
