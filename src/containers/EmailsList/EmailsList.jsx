import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import moment from 'moment';
import Cookies from 'cookies-js';

import styles from './emailsList.css';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';

import { getEmails } from '../../actions/emailsActions';

class EmailsList extends Component {
  state = {
    offset: 0,
    pageNum: 1,
    perPage: 10
  }

  componentDidMount() {
    this._renderEmailList();
  }

  render() {
    const { emails } = this.props;
    const results = emails.list.map(val => {
      return (
        <tr key={val.id}>
          <td className="cell cell-25 name">
            { val.name }
          </td>

          <td className="cell cell-25 description ">
            { val.description }
          </td>

          <td className="cell cell-25 modified">
            { moment(this.props.updated_at).fromNow() }
          </td>

          <td className="cell actions">
            <Link to={ `/admin/emails/edit/${val.id}` }>
              <Button
                classes={'primary sm'}
                icon="pencil"
                toolTipText="Edit Email"
              />
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div className="emailsList">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { results }
          </tbody>
        </table>
      </div>
    );
  };

  _renderEmailList = () => {
    const { token, dispatch } = this.props;
    const { offset, perPage } = this.state;
    return dispatch(getEmails(token, offset, perPage));
  }
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    emails: state.emails
  };
}

export default connect(mapStateToProps)(EmailsList);

