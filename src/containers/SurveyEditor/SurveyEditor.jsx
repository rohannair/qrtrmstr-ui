// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';
import _ from 'lodash';

// Containers
import { getSingleSurvey, toggleOpenCard, addSlide, modifySurvey } from '../../actions/surveyViewActions';

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

class SurveyEditor extends Component {
  componentWillMount() {
    this._renderSurvey();
  };

  render() {
    const { survey, openCards } = this.props;

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
        <div key={val}><h1>Bio</h1></div>
        </Card>
        );

       case 'equipment':
       return (
        <Card key={val} title={`Section ${parseInt(val) + 1}`}>
        <SlideEquipment {...slide} />
        </Card>
        );

       default:
       return (
        <Card key={val} title={`Section ${parseInt(val) + 1}`}>
        <h1>{slide.heading}</h1>
        <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(slide.body, null, 4) }} />
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
      <div>
      { surveyDoc }
      </div>
      );
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
  }
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

