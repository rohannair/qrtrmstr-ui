// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

// Containers
import {
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
import SlideEquipment from '../../components/SlideEquipment';
import SlideKnowledgeCenter from '../../components/SlideKnowledgeCenter';
import SlideFirstDay from '../../components/SlideFirstDay';

class SurveyEditor extends Component {

  state = {
    editedSurveyDoc: {}
  };

  componentWillMount() {
    this._renderSurvey();
  };

  render() {
    const { survey, openCards } = this.props;

    // this.setState({
    //   editedSurveyDoc: survey.doc
    // });


    const surveyDoc = survey.doc && Object.keys(survey.doc).length > 0
    ? Object.keys(survey.doc).map(val => {
      const slide = survey.doc[val];

      switch (slide.type) {
      case 'intro':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}`}>
            <SlideIntro key={val} {...slide} />
          </Card>
        );

      case 'bio':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}`}>
            <div key={val}>
              <h1>Bio</h1>
              <p>Hello, I am a Biography Card</p>
            </div>
          </Card>
        );

      case 'equipment':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}`}>
            <SlideEquipment {...slide} saveSlide={ this._saveSlide } />
          </Card>
        );

      case 'knowledgectr':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}`}>
            <SlideKnowledgeCenter {...slide.body} />
          </Card>
        );

      case 'day1agenda':
        return (
          <Card key={val} title={`Section ${parseInt(val) + 1}`}>
            <h1>{slide.heading}</h1>
            <SlideFirstDay
              {...slide}
              onEdit={this._editSlide}
              onAdd={this._addNewAgendaItem}
              onDelete= {this._deleteAgendaItem}
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
        <SurveyEditorSidebar save={this._saveSurvey}/>
      </div>
      );
  };

  _saveSurvey = () => {
    // const { token, dispatch, survey } = this.props;

  };

  _postSurvey = () => {
    const { token, dispatch, survey } = this.props;
    return dispatch(modifySurvey(token, survey));
  };

  _toggleOpen = (e) => {
    const { dispatch } = this.props;
    return dispatch(toggleOpenCard(e.target.id));
  };

  _renderSurvey = () => {
    const { token, dispatch } = this.props;
    const { surveyID } = this.props.params;
    return dispatch(getSingleSurvey(token, surveyID));
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

  _editSlide = (data) => {
    const { dispatch } = this.props;
    return dispatch(editSlide(data));
  };

  // TODO: Remove this
  _saveSlide = ({ options }, slideNumber) => {
    const { token, dispatch } = this.props;
    const { surveyID } = this.props.params;
    return dispatch(editSlide(options, slideNumber));
  };

  _addNewAgendaItem = (item) => {
    const { dispatch } = this.props;
    // return dispatch(editSlide())
  };

  _deleteAgendaItem = (item) => {
    const { dispatch } = this.props;
  };

  // _changeUserParams = (key, val) => {
  //   const { editedSurveyDoc } = this.state;
  //   this.setState({
  //     editedSurveyDoc: {
  //       ...editedSurveyDoc,
  //       [key]: val
  //     }
  //   });
  // };
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
