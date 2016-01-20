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
import { setSelection, submitSurvey } from '../../actions/surveyActions';

class Survey extends Component {
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
