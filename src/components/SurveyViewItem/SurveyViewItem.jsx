import React from 'react';
import styles from './surveyViewItem.css';
import { Link } from 'react-router';
import moment from 'moment';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

const SurveyViewItem = (props) => {
  const href = `/survey/${props.id}`;

  return (
    <tr key={ props.id } className="userList-option">
      <td className="checkbox"><input type="checkbox" /></td>
      <td>{ props.name } <a href={ href } target="_blank"><i className="oi" data-glyph="external-link"></i></a></td>
      <td>{ moment(props.created_at).fromNow() }</td>
      <td>{ moment(props.updated_at).fromNow() }</td>
      <td>
        <ButtonGroup>
          <Link to={`/dashboard/surveys/edit/${props.id}`}>
            <Button classes='inverse sm'>Edit</Button>
          </Link>
          <Button onClick={ props.duplicate.bind(this, props.id) } classes="inverse md">Duplicate</Button>
          <Button onClick={ props.onShowModal.bind(this, { id: props.id, name: props.name}) } classes="primary md">Send To User</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default SurveyViewItem;

