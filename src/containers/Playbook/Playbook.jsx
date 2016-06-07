// Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';
import jwtDecode from 'jwt-decode';

// Styles
import styles from './playbook.css';

// Components
import Footer from '../../components/Global/Footer';
import Header from '../../components/Global/Header';
import PlaybookCards from '../../components/PlaybookCards';

// Containers
import Uploader from '../Uploader';

// Actions
import { setSelection, submitPlaybook, getPlaybook, editSubmittedPlaybook } from '../../actions/playbookActions';
import { uploadComplete } from '../../actions/uploadActions';

class Playbook extends Component {

  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
  };

  render() {
    const { id, fields, selected, token, img } = this.props;
    // const PlaybookUploader = (<Uploader updateState={(url) => console.log(url)} ><i className="material-icons">cloud_upload</i></Uploader>);
    return (
      <div className="playbook">
        <Header isAdmin={false} />
        <PlaybookCards
          updateImage={ this._updateImage }
          onEquipChange={ this._updateEquipmentSubDoc}
          findSlideKey={ this._findSlideKey }
          onChange={ this._updateSubmittedDoc }
          submittedDoc={ this.props.submittedDoc }
          onSubmit={ this._onSubmitPlaybook }
          fields={ fields }
          onClick={ this._onClick }
          selected={ selected }
          img={ img }
        />
        <Footer />
      </div>
    );
  };

  _onClick = (id) => {
    return this.props.dispatch(setSelection(id));
  };

  _updateImage = (image) => {
    const { dispatch } = this.props;
    return dispatch(uploadComplete(image));
  };

  _findSlideKey = (slideNum) => {
    const { submittedDoc } = this.props;
    let slide = null;
    let slideKey = null;
    // Isolate the key element that is changing
    for (let val in submittedDoc) {
      if (submittedDoc[val].slide_number === +slideNum) {
        slide = submittedDoc[val];
        slideKey = val;
      };
    };
    return { slide, slideKey };
  };

  _updateSubmittedDoc = (slideNum, key, value) => {
    const { dispatch, submittedDoc } = this.props;
    const { slide, slideKey } = this._findSlideKey(slideNum);
    let updatedSlide = null;
    if (Object.keys(slide.body.options).indexOf(key) > -1) {
      updatedSlide = {
        ...slide,
        submitted: true,
        body: {
          ...slide.body,
          options: {
            ...slide.body.options,
            [key]: value
          }
        }
      };
    }

    return dispatch(editSubmittedPlaybook(slideKey, updatedSlide));
  };

  _updateEquipmentSubDoc = (slideNum, id, value) => {
    const { dispatch, submittedDoc } = this.props;

    const { slide, slideKey } = this._findSlideKey(slideNum);

    let oldItem = null;
    let oldItemKey = null;
    for (let val in slide.body.options) {
      if (slide.body.options[val].id === id) {
        oldItem = slide.body.options[val];
        oldItemKey = val;
      }
    };
    const newItem = {
      ...oldItem,
      opts: value.opts,
      optNames: value.optNames
    };
    const newEquipOptions = [
      ...slide.body.options.slice(0, oldItemKey),
      newItem,
      ...slide.body.options.slice(+oldItemKey + 1)
    ];

    const updatedSlide = {
      ...slide,
      submitted: true,
      body: {
        ...slide.body,
        options: newEquipOptions
      }
    };

    return dispatch(editSubmittedPlaybook(slideKey, updatedSlide));
  };

  _onSubmitPlaybook = () => {
    const { dispatch, submittedDoc, params } = this.props;
    return dispatch(submitPlaybook({submitted_doc: submittedDoc}, params.playbookID));
  };

  _getPlaybook = id => {
    const { token, dispatch } = this.props;
    if(token) {
      return dispatch(getPlaybook(token, id));
    }
    return dispatch(getPlaybook(null, id));
  };

};

function select(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    id: state.playbook.id,
    token,
    fields: state.playbook.playbook,
    submittedDoc: state.playbook.submittedPlaybook,
    selected: state.playbook.selected,
    img: state.uploader.img
  };
}

export default connect(select)(Playbook);
