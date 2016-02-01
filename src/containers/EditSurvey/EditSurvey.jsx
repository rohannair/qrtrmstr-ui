// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Cookies from 'cookies-js';
import moment from 'moment';

// Containers
import { getSingleSurvey } from '../../actions/surveyViewActions';

// Styles
import styles from './editSurvey.css';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import TextEditor from '../../components/TextEditor';
import SurveyDetailsSidebar from '../../components/SurveyDetailsSidebar';
import SurveyEditorSidebar from '../../components/SurveyEditorSidebar';

class EditSurvey extends Component {
  componentWillMount() {
    this._renderSurvey();
  }

  render() {
    const { surveyID } = this.props.params;
    const { name, created_at, updated_at } = this.props.survey[0]
      ? this.props.survey[0]
      : '';

    const survey = this.props.survey[0]
      ? this.props.survey[0].document.survey
      : [];

    const boxes = survey.map((val) => {

      const editField = !val.form
        ? (<TextEditor>{val.body}</TextEditor>)
        : <div>{
            val.contents.options.map(val => {
              return (
                <div className="survey-option" key={val.id}>
                  <label>{`ID: ${val.id}`}</label>

                  <label>Image:
                    <input type="text" defaultValue={val.imageUri} />
                  </label>

                  <label>Title:
                    <input type="text" defaultValue={val.title} />
                  </label>

                  <label>Description:
                    <TextEditor>{val.body}</TextEditor>
                  </label>
                </div>
              );
            })
          }
        </div>;

      return (
        <div key={val.id} className="editSurvey-slide">
          <h3 className="slide-heading">
            {val.heading}
            <div className="group">
              <i className="oi" data-glyph="move" />
              <i className="oi" data-glyph="trash" />
            </div>
          </h3>
          <label>Body:
            { editField }
          </label>
        </div>
        );
    });

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
            <div className="editSurvey-body">
              { boxes }
            </div>
            <SurveyEditorSidebar />
          </div>
        </Card>
      </div>
    );
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
    survey: state.surveyList.surveys
  };
}
export default connect(mapStateToProps)(EditSurvey);

