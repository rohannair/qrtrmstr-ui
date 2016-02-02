// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

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


class SurveyEditor extends Component {
  componentWillMount() {
    this._renderSurvey();
  };

  render() {
    const { survey, openCards } = this.props;
    const selectedSurvey = survey.doc || {};
    const { surveyID } = this.props.params;

    const { name, created_at, updated_at } = survey
      ? survey
      : '';

    console.log(JSON.stringify(survey, null, 4));

    return (
      <div>
        <Card><div>Edit Survey</div></Card>
        <SurveyDetails
          name={name}
          surveyID={surveyID}
          created_at={created_at}
          updated_at={updated_at}
        />

        <div className="editSurvey">
          <SurveyEditorBody
            survey={ selectedSurvey }
            onClick={this._toggleOpen}
            openItems={openCards}
          />
          <SurveyEditorSidebar save={this._postSurvey} onClick={this._addNewSlide} />
        </div>
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

