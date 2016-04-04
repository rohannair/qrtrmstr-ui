// Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import styles from './survey.css';

// Components
import Footer from '../../components/Global/Footer';
import Header from '../../components/Global/Header';
import SurveyCards from '../../components/SurveyCards';

// Actions
import { setSelection, submitSurvey, getSurvey } from '../../actions/surveyActions';

class Survey extends Component {
  componentWillMount() {
    this._getSurvey();
  };

  render() {
    const { id, fields, selected } = this.props;
    return (
      <div className="survey">
        <Header />
        <SurveyCards
          fields={ fields }
          onClick={ this._onClick }
          onSubmit={ this._onSubmit }
          selected={ selected }
        />
        <Footer />
      </div>
    );
  };

  _onClick = (id) => {
    return this.props.dispatch(setSelection(id));
  };

  _onSubmit = () => {
    const { selected } = this.props;
    return this.props.dispatch(submitSurvey(selected));
  };

  _getSurvey = (id = '1e9eddbc-7ede-43fd-9bde-364bba4d84e9') => {
    const { token, dispatch } = this.props;
    return dispatch(getSurvey(token, id));
  }

};

function select(state) {
  return {
    id: state.survey.id,
    fields: state.survey.survey,
    selected: state.survey.selected
  };
}

export default connect(select)(Survey);
