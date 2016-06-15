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

// Actions
import { setSelection, submitPlaybook, getPlaybook, editSubmittedPlaybook, updatePlaybookStatus } from '../../actions/playbookActions';
import { uploadComplete } from '../../actions/uploadActions';

class Playbook extends Component {

  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
    if (this.props.location.query.from_email) this._setInProgress(id);
  };

  render() {
    const { id, selected, token, img, playbook } = this.props;
    return (
      <div className="playbook">
        <Header isAdmin={false} />
        <PlaybookCards
          onEquipChange={ this._updateEquipmentSubDoc}
          findSlideKey={ this._findSlideKey }
          onChange={ this._updateSubmittedDoc }
          onSubmit={ this._onSubmitPlaybook }
          playbook={ playbook }
          onClick={ this._onClick }
          selected={ selected }
          img={ img }
          uploaderFn={ this._updateSubmittedDoc }
        />
        <Footer />
      </div>
    );
  };

  _onClick = (id) => {
    return this.props.dispatch(setSelection(id));
  };

  _findSlideKey = (slideNum) => {
    const { playbook } = this.props;
    let slide = null;
    let slideKey = null;
    // Isolate the key element that is changing
    for (let val in playbook.submitted_doc) {
      if (playbook.submitted_doc[val].slide_number === +slideNum) {
        slide = playbook.submitted_doc[val];
        slideKey = val;
      };
    };
    return { slide, slideKey };
  };

  _updateSubmittedDoc = (slideNum, key, value) => {
    const { dispatch, playbook } = this.props;
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
    const { dispatch, playbook } = this.props;
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
    const { dispatch, playbook, params } = this.props;
    return dispatch(submitPlaybook({submitted_doc: playbook.submitted_doc}, params.playbookID));
  };

  _getPlaybook = id => {
    const { token, dispatch } = this.props;
    if (token) {
      return dispatch(getPlaybook(token, id));
    }
    return dispatch(getPlaybook(null, id));
  };

  _setInProgress = id => {
    this.props.dispatch(updatePlaybookStatus({current_status: 'in progress'}, id));
  };

};

function select(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    id: state.playbook.id,
    token,
    playbook: state.playbook.playbook,
    selected: state.playbook.selected,
    img: state.uploader.img
  };
}

export default connect(select)(Playbook);
