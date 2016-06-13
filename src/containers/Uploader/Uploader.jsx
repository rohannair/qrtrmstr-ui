import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';

import styles from './uploader.css';

import Button from '../../components/Button';
import FormData from 'form-data';

// Actions
import { postUpload, setLoading, deleteImage, uploadComplete } from '../../actions/uploadActions';

// Img
import loadingGif from '../../assets/loading.gif';

class Uploader extends Component {

  static propTypes = {
    updateState: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (this.props.savedPic) this.props.dispatch(uploadComplete(this.props.savedPic));
  };

  componentDidUpdate(lastParams) {
    if (this.props.img && lastParams.img !== this.props.img) {
      this.props.updateState(this.props.img);
    }
    if (!this.props.img && lastParams.img !== this.props.img) {
      this.props.updateState(null);
    }
  };


  render() {
    const img = this.props.img || null;
    const loading = this.props.loading;
    const componentToMount = this._whatToMount(loading, img);

    return (
      <div className="uploader">
        { componentToMount }
      </div>
    );
  };

  _validateUpload = (e) => {
    const { dispatch, token } = this.props;
    dispatch(setLoading());

    const uploadedFile = e.target.files[0];
    const form = new FormData();
    form.append('file', uploadedFile);

    dispatch(postUpload(token, form));
  };

  _deleteImage = (e) => {
    e.preventDefault();
    this.props.dispatch(deleteImage());
  };

  _whatToMount = (loading, img) => {
    if (loading) return <LoadingContainer />;
    if (img) return <ImgContainer url={img.url} deleteImg={this._deleteImage}/>;

    return (
      <label for="fileInput">
        <input
          name="fileInput"
          type="file"
          onChange={ this._validateUpload }
        />
        { this.props.children }
      </label>
    );
  }
}

const LoadingContainer = () => (
  <div className="LoadingContainer" >
    <img src={ loadingGif } alt="Loading..." />
  </div>
);

const ImgContainer = (props) => (
  <div className="ImgContainer">
    <img src={ props.url } />
    <Button
      classes="xs transparent"
      icon="times"
      toolTipText="Delete Image"
      onClick={props.deleteImg}
    />
  </div>
);

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');
  const { loading, img } = state.uploader;

  return {
    loading,
    token,
    img
  };
}

export default connect(mapStateToProps)(Uploader);

