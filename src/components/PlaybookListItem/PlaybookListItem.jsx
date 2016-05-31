import React from 'react';
import styles from './playbookListItem.css';
import { Link } from 'react-router';
import moment from 'moment';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

const PlaybookListItem = props => {
  const href = `/playbook/${props.id}`;
  const assignedTo = props.firstName ? `${props.firstName} ${props.lastName}` : ' ';

  return (
    <div key={ props.id } className="playbookListItem">
      <div className="cell checkbox"><input type="checkbox" /></div>

      <div className="cell name">
        { `${props.name}  `}

        <Link to={`/playbook/${props.id}`}>
          <i className="fa fa-external-link"></i>
        </Link>
      </div>

      <div className="cell modified">
        { moment(props.updated_at).format('MMMM DD YYYY, h:mma') }
      </div>

      <div className="cell assigned assigned-text">
        { assignedTo }
      </div>

      <div className="cell collaborators">
      </div>

      <div className="cell status">
      </div>

      <div className="cell actions">
        <ButtonGroup>
          <Button
            onClick={ props.onEditShowModal.bind(this,
              { id: props.id, name: props.name}
            ) }
            classes="inverse sm"
            icon="pencil"
            toolTipText="Edit Name"
          />

          <Button
            onClick={ props.duplicate.bind(this, props.id) }
            classes="inverse sm"
            icon="copy"
            toolTipText="Duplicate Playbook"
          />

          <Link to={`/dashboard/playbooks/edit/${props.id}`}>
            <Button
              classes='primary sm'
              icon="cog"
              toolTipText="Edit Playbook"
            />
          </Link>


          <Button
            onClick={ props.onAssignShowModal.bind(this,
              { id: props.id, name: props.name}
            ) }
            classes="inverse sm"
            icon="user"
            toolTipText="Assign Playbook"
          />

          <Button
            onClick={ props.onSendShowModal.bind(this,
              { id: props.id, name: props.name}
            ) }
            classes="tertiary sm"
            icon="paper-plane"
            toolTipText="Send to User"
          />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PlaybookListItem;
