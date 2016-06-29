import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

import styles from './emailsContainer.css';

class EmailsContainer extends Component {

  render() {
    return (
      <div className="emailsContainer">
      </div>
    );
  }
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');

  return {
    token
  };
}

export default connect(mapStateToProps)(EmailsContainer);

