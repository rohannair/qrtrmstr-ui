// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

// Constants
import slideTypes from '../../constants/slideTypes';

// Containers
import {
  editPlaybook,
  getSinglePlaybook,
  addSlide,
  modifyPlaybook,
  reorderPlaybook,
  isSaving
} from '../../actions/playbookEditorActions';

import { insertNewSlide } from '../../actions/playbookViewActions';

// Styles
import styles from './playbookEditor.css';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import PlaybookDetails from '../../components/PlaybookDetails';
import PlaybookEditorHeader from '../../components/PlaybookEditorHeader';
import PlaybookEditorBody from '../../components/PlaybookEditorBody';
import PlaybookEditorSidebar from '../../components/PlaybookEditorSidebar';

import SlideIntro from '../../components/SlideIntro';
import SlideBio from '../../components/SlideBio';
import SlideEquipment from '../../components/SlideEquipment';
import SlideKnowledgeCenter from '../../components/SlideKnowledgeCenter';
import SlideFirstDay from '../../components/SlideFirstDay';
import Dialog from '../../components/Dialog';

class PlaybookEditor extends Component {
  state = {
    showModal: false,
    removeTabInfo: {
      chosenTab: null,
      selected: null,
      optionsOriginal: null,
      slide_num: null
    },
    playbook: null
  };

  static propTypes = {
    saveStatus: PropTypes.oneOf(['SAVED', 'SAVING', 'UNSAVED']).isRequired
  }

  componentWillMount() {
    this._renderPlaybook();
  };

  render() {
    const { playbook, saveStatus } = this.props;

    const RemoveEquipmentDialog = this.state.showModal
    ? <Dialog
        onAction={ this._removeOption }
        buttonAction='Remove'
        onClose={ this._closeModal }
        heading='Confirmation Needed'>
        <p>Are you sure you want to remove this tab?</p>
      </Dialog>
    : null;

    const playbookDoc = playbook.doc && Object.keys(playbook.doc).length > 0
    ? Object.keys(playbook.doc).map(val => {

      const slide = playbook.doc[val];
      const header = <PlaybookEditorHeader val={ val } moveSlide={ this._moveSlide } slideType={ slideTypes[slide.type] || '' } hidden={slide.hidden} toggleVisibility={ this._toggleSlideVisibility } />;

      switch (slide.type) {
      case 'intro':
        return (
          <Card key={val} title={ header }>
            <SlideIntro
              { ...slide }
              onChange={ this._updateSlide }
            />
          </Card>
        );

      case 'bio':
        return (
          <Card key={val} title={ header }>
            <SlideBio
              {...slide}
              onChange={ this._updateSlide }
            />
          </Card>
        );

      case 'equipment':
        return (
          <Card key={val} title={ header }>
            <SlideEquipment
              {...slide}
              openModal={ this._openModal }
              selected={ this.state.removeTabInfo.selected }
              closeModal={ this._closeModal }
              saveSlide={ this._saveSlide }
              onChange={ this._updateSlide } />
          </Card>
        );

      case 'knowledgectr':
        return (
        <Card key={val} title={ header }>
            <SlideKnowledgeCenter
              {...slide}
              onChange={ this._updateSlide }
            />
          </Card>
        );

      case 'day1agenda':
        return (
          <Card key={val} title={ header }>
            <SlideFirstDay
              {...slide}
              onAdd={this._addNewAgendaItem}
              onDelete= {this._deleteAgendaItem}
              onChange={ this._updateSlide }
            />
          </Card>
        );

      default:
        return (
          <Card key={val} title={ header }>
            <h1>{slide.heading}</h1>
            <pre>{ JSON.stringify(slide.body, null, 4) }</pre>
          </Card>
        );
      }
    })
    : null;

    const selectedPlaybook = playbook.doc || {};
    const { playbookID } = this.props.params;

    const { name, created_at, updated_at } = playbook
    ? playbook
    : '';

    return (
      <div className="playbookEditor container">
        <PlaybookEditorBody>
          { playbookDoc}
        </PlaybookEditorBody>
        <div className="playbookEditor-sidebar-container">
          <PlaybookEditorSidebar
            save={this._savePlaybook}
            saveStatus={ saveStatus }
            id={ playbookID }
            insertNewSlide={this._insertNewSlide}
          />
        </div>
        { RemoveEquipmentDialog }
      </div>
      );
  };

  _openModal = (key, selected, options, slideNum) => {
    this.setState({
      showModal: true,
      removeTabInfo: {
        chosenTab: key,
        selected: selected,
        optionsOriginal: options,
        slide_num: slideNum
      }
    });
  };

  _removeOption = () => {
    const { removeTabInfo } = this.state;
    const options = removeTabInfo.optionsOriginal
    .filter(val => {
      return val.id !== removeTabInfo.chosenTab;
    });

    const { body } = this.props;

    const updatedSlide = {
      ...body,
      options: options
    };

    this._updateSlide('body', updatedSlide, removeTabInfo.slide_num);
    this.setState({
      chosenTab: null
    });

    this._closeModal();
  };

  _closeModal = () => {
    this.setState({
      showModal: false
    });
    const { showModal } = this.state;
  };

  _renderPlaybook = () => {
    const { token, dispatch } = this.props;
    const { playbookID } = this.props.params;
    return dispatch(getSinglePlaybook(token, playbookID));
  };

  _findSlideKey = (slideNum) => {
    const { playbook } = this.props;
    let slide = null;
    let slideKey = null;
    // Isolate the key element that is changing
    for (let val in playbook.doc) {
      if (playbook.doc[val].slide_number === +slideNum) {
        slide = playbook.doc[val];
        slideKey = val;
      };
    };
    return { slide, slideKey };
  };

  _updateSlide = (key, value, slideNum) => {
    const { dispatch, playbook } = this.props;
    const { slideKey } = this._findSlideKey(slideNum);
    const updatedSlide = {
      [key]: value
    };
    return dispatch(editPlaybook(slideKey, updatedSlide));
  };

  _savePlaybook = () => {
    const { token, dispatch, playbook, params } = this.props;
    dispatch(isSaving());
    return dispatch(modifyPlaybook(token, { doc: playbook.doc }, params.playbookID));
  };

  _moveSlide = (i, direction) => {
    const { dispatch } = this.props;
    return dispatch(reorderPlaybook(i, direction));
  };

  _toggleSlideVisibility = (n) => {
    const { token, dispatch, playbook, params } = this.props;
    const slide = playbook.doc[n];

    const updatedSlide = {
      ...slide,
      hidden: !slide.hidden
    };

    return dispatch(editPlaybook(n, updatedSlide));
  };

  _addNewSlide = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const newID = 'xxx' + Math.floor(Math.random() * (99999 - 10000)) + 10000;

    const slideInfo = {
      type: 'text',
      heading: 'test',
      body: '<p>TESTTESTTEST</p>'
    };

    return dispatch(addSlide(newID, slideInfo));
  };

  _insertNewSlide = () => {
    const { token, dispatch } = this.props;
    const { playbookID } = this.props.params;
    dispatch(insertNewSlide(token, playbookID));
  };
};

function mapStateToProps(state, ownProps) {
  const token = state.accountActions.token || Cookies.get('token');

  return {
    openCards: state.playbookAdmin.openCards,
    playbook: state.playbookAdmin.playbook,
    playbookID: ownProps.params.id,
    users: state.playbookAdmin.users,
    saveStatus: state.playbookAdmin.saveStatus,
    token
  };
}
export default connect(mapStateToProps)(PlaybookEditor);
