// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';
import { StickyContainer } from 'react-sticky';


// Containers
import {
  updateSurveyState,
  getSingleSurvey,
  toggleOpenCard,
  addSlide,
  modifySurvey,
  editSlide
} from '../../actions/surveyViewActions';

// Styles
import styles from './surveyEditor.css';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import SurveyDetails from '../../components/SurveyDetails';
import SurveyEditorBody from '../../components/SurveyEditorBody';
import SurveyEditorSidebar from '../../components/SurveyEditorSidebar';

import SlideIntro from '../../components/SlideIntro';
import SlideBio from '../../components/SlideBio';
import SlideEquipment from '../../components/SlideEquipment';
import SlideKnowledgeCenter from '../../components/SlideKnowledgeCenter';
import SlideFirstDay from '../../components/SlideFirstDay';

class SurveyEditor extends Component {

  componentWillMount() {
    this._renderSurvey();
  };

  render() {
    const { survey, openCards, dispatch } = this.props;

    const surveyDoc = survey.doc && Object.keys(survey.doc).length > 0
    ? Object.keys(survey.doc).map(val => {
      const slide = survey.doc[val];

      switch (slide.type) {
      case 'intro':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}: Introduction`}>
            <SlideIntro key={ val } {...slide} onChange={ this._updateSlide } />
          </Card>
        );

      case 'bio':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}: Biography`}>
            <SlideBio key={ val } {...slide} onChange={ this._updateSlide } />
          </Card>
        );

      case 'equipment':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}: Equipment`}>
            <SlideEquipment {...slide} saveSlide={ this._saveSlide } onChange={ this._updateSlide } />
          </Card>
        );

      case 'knowledgectr':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}: Knowledge Center`}>
            <SlideKnowledgeCenter {...slide} onChange={ this._updateSlide } />
          </Card>
        );

      case 'day1agenda':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}: Day One Agenda`}>
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
          <Card key={val} title={`Section ${parseInt(val) + 1}`}>
            <h1>{slide.heading}</h1>
            <pre>{ JSON.stringify(slide.body, null, 4) }</pre>
          </Card>
        );
      }
    })
    : null;

    const selectedSurvey = survey.doc || {};
    const { surveyID } = this.props.params;

    const { name, created_at, updated_at } = survey
    ? survey
    : '';

    return (
      <div className="surveyEditor">
        <SurveyEditorBody>
          { surveyDoc }
        </SurveyEditorBody>
        <StickyContainer className="sidebarBuffer" >
            <SurveyEditorSidebar save={this._saveSurvey}/>
        </StickyContainer>
      </div>
      );
  };

  _renderSurvey = () => {
    const { token, dispatch } = this.props;
    const { surveyID } = this.props.params;
    return dispatch(getSingleSurvey(token, surveyID));
  };

  _updateSlide = (key, value, slideNum) => {
    const { dispatch, survey } = this.props;
    const updatedSlide = {
      [key]: value
    };
    return dispatch(updateSurveyState(slideNum, updatedSlide));
  };

  _saveSurvey = () => {
    const { token, dispatch, survey, params } = this.props;
    return dispatch(modifySurvey(token, {doc: survey.doc}, params.surveyID));

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
    openCards: state.surveyAdmin.openCards,
    survey: state.surveyAdmin.survey,
    surveyID: ownProps.params.id,
    token,
  };
}
export default connect(mapStateToProps)(SurveyEditor);
