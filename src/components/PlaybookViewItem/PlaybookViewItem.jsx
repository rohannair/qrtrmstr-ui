import React from 'react';
import styles from './playbookViewItem.css';
import { Link } from 'react-router';
import moment from 'moment';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

const PlaybookViewItem = props => {
  const href = `/playbook/${props.id}`;

  return (
    <div key={ props.id } className="playbookView-option">
      <div className="cell checkbox"><input type="checkbox" /></div>

      <div className="cell name">
        { `${props.name}  `}

        <a href={ href }>
          <i className="fa fa-external-link"></i>
        </a>
      </div>

      <div className="cell modified">
        { moment(props.updated_at).format('MMMM DD YYYY, h:mma') }
      </div>

      <div className="cell collaborators">
      </div>

      <div className="cell status">
      </div>

      <div className="cell actions">
        <ButtonGroup>

          <Button
            classes="primary sm"
            icon="cog"
            toolTipText="Edit Playbook Details"
          />

          <Link to={`/dashboard/playbooks/edit/${props.id}`}>
            <Button
              classes='inverse sm'
              icon="pencil"
              toolTipText="Edit Playbook"
            />
          </Link>

          <Button
            onClick={ props.duplicate.bind(this, props.id) }
            classes="inverse sm"
            icon="copy"
            toolTipText="Duplicate Playbook"
          />

          <Button
            onClick={ props.onShowModal.bind(this,
              { id: props.id, name: props.name}
            ) }
            classes="secondary sm"
            icon="paper-plane"
            toolTipText="Send to User"
          />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PlaybookViewItem;
