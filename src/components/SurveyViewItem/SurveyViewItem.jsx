import React from 'react';
import styles from './surveyViewItem.css';
import { Link } from 'react-router';
import moment from 'moment';
import Button from '../../components/Button';

const SurveyViewItem = (props) => {
  return (
    <tr key={ props.id } className="userList-option">
      <td className="checkbox"><input type="checkbox" /></td>
      <td>{ props.name } <a href="/survey" target="_blank">(Preview)</a></td>
      <td>{ moment(props.created_at).fromNow() }</td>
      <td>{ moment(props.updated_at).fromNow() }</td>
      <td>
        <Link to={`/dashboard/surveys/edit/${props.id}`}>
          <Button classes='inverse sm'>Edit</Button>
        </Link>
      </td>
      <td>
        <Button onClick={ props.onShowModal.bind(this, { id: props.id, name: props.name}) } classes="primary md">Send To User</Button>
      </td>
    </tr>
  );
};

export default SurveyViewItem;
    