// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

// Containers
import { getSingleSurvey, toggleOpenCard } from '../../actions/surveyViewActions';

// Styles
import styles from './editSurvey.css';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import SurveyEditorBody from '../../components/SurveyEditorBody';
import SurveyDetailsSidebar from '../../components/SurveyDetailsSidebar';
import SurveyEditorSidebar from '../../components/SurveyEditorSidebar';

class EditSurvey extends Component {
  componentWillMount() {
    this._renderSurvey();
  }

  render() {
    const { openCards } = this.props;
    const { surveyID } = this.props.params;
    const { name, created_at, updated_at } = this.props.survey[0]
      ? this.props.survey[0]
      : '';

    const survey = this.props.survey[0]
      ? this.props.survey[0].document.survey
      : [];

    const head = <SurveyDetailsSidebar
      name={name}
      surveyID={surveyID}
      created_at={created_at}
      updated_at={updated_at}
    />;

    return (
      <div>
        <Card><div>Edit Survey</div></Card>
        <Card noPadding={true} title={head}>
          <div className="editSurvey">
            <SurveyEditorBody survey={survey} onClick={this._toggleOpen} openItems={openCards} />
            <SurveyEditorSidebar />
          </div>
        </Card>
      </div>
    );
  }

  _toggleOpen = (e) => {
    const { dispatch } = this.props;
    return dispatch(toggleOpenCard(e.target.id));
  }

  _renderSurvey = () => {
    const { token, dispatch } = this.props;
    const { surveyID } = this.props.params;
    return dispatch(getSingleSurvey(token, surveyID));
  };
};

function mapStateToProps(state, ownProps) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    surveyID: ownProps.params.id,
    token,
    survey: state.surveyList.surveys,
    openCards: state.surveyList.openCards
  };
}
export default connect(mapStateToProps)(EditSurvey);

