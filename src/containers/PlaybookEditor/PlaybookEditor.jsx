// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';
import { StickyContainer } from 'react-sticky';

// Containers
import {
  updatePlaybookState,
  getSinglePlaybook,
  toggleOpenCard,
  addSlide,
  modifyPlaybook,
  editSlide,
  reorderPlaybook
} from '../../actions/playbookViewActions';

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

class PlaybookEditor extends Component {

  componentWillMount() {
    this._renderPlaybook();
  };

  render() {
    const { playbook, openCards, dispatch } = this.props;
    const playbookDoc = playbook.doc && Object.keys(playbook.doc).length > 0
    ? Object.keys(playbook.doc).map(val => {
      const slide = playbook.doc[val];
      let header = (
        <PlaybookEditorHeader val={ val } moveSlide={this._moveSlide}>
          {`Section ${parseInt(val) + 1}`}
        </PlaybookEditorHeader>);

      switch (slide.type) {
      case 'intro':
        return (
          <Card key={val} title={ header }>
            <SlideIntro key={ val } {...slide} onChange={ this._updateSlide } />
          </Card>
        );

      case 'bio':
        return (
        <Card key={val} title={ header }>
            <SlideBio key={ val } {...slide} onChange={ this._updateSlide } />
          </Card>
        );

      case 'equipment':
        return (
        <Card key={val} title={ header }>
            <SlideEquipment {...slide} saveSlide={ this._saveSlide } onChange={ this._updateSlide } />
          </Card>
        );

      case 'knowledgectr':
        return (
        <Card key={val} title={ header }>
            <SlideKnowledgeCenter {...slide} onChange={ this._updateSlide } />
          </Card>
        );

      case 'day1agenda':
        return (
        <Card key={val} title={ header }>
            <SlideFirstDay
              {...slide}
              onEdit={this._editSlide}
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
      <div className="playbookEditor">
        <PlaybookEditorBody>
          { playbookDoc}
        </PlaybookEditorBody>
        <StickyContainer className="sidebarBuffer" >
          <PlaybookEditorSidebar save={this._savePlaybook}/>
        </StickyContainer>
      </div>
      );
  };

  _renderPlaybook = () => {
    const { token, dispatch } = this.props;
    const { playbookID } = this.props.params;
    return dispatch(getSinglePlaybook(token, playbookID));
  };

  _updateSlide = (key, value, slideNum) => {
    const { dispatch, playbook } = this.props;
    const updatedSlide = {
      [key]: value
    };
    return dispatch(updatePlaybookState(slideNum, updatedSlide));
  };

  _savePlaybook = () => {
    const { token, dispatch, playbook, params } = this.props;
    return dispatch(modifyPlaybook(token, {doc: playbook.doc}, params.playbookID));
  };

  _moveSlide = (i, direction) => {
    const { dispatch } = this.props;
    return dispatch(reorderPlaybook(i, direction));
  };

  _toggleOpen = (e) => {
    const { dispatch } = this.props;
    return dispatch(toggleOpenCard(e.target.id));
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
};

function mapStateToProps(state, ownProps) {
  const token = state.accountActions.token || Cookies.get('token');

  return {
    openCards: state.playbookAdmin.openCards,
    playbook: state.playbookAdmin.playbook,
    playbookID: ownProps.params.id,
    token
  };
}
export default connect(mapStateToProps)(PlaybookEditor);
