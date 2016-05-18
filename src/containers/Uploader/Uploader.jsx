import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';

import styles from './uploader.css';

import FormData from 'form-data';
debugger
// Actions
import { postUpload } from '../../actions/uploadActions';

// 1. Consume file with form-data
// 2. Need an upload action
// 3. Invoke said action with the form-data
// 4. Wait for response
// 5. Rejoice

class Uploader extends Component {

  render() {
    return (
      <div className="uploader">
        <label for="fileInput">
          <input
            name="fileInput"
            type="file"
            onChange={ this._validateUpload }
          />
        </label>
      </div>
    );
  };

  _validateUpload = (e) => {
    const { dispatch, token } = this.props;
    const uploadedFile = e.target.files[0];
    const form = new FormData();
    form.append('file', uploadedFile);

    dispatch(postUpload(token, form));
  };
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');

  return {
    token
  };
}

export default connect(mapStateToProps)(Uploader);

