import React, { Component, PropTypes } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import moment from 'moment';

const SurveyDetailsSidebar = ({surveyID, created_at, updated_at, name}) => {
  return (
    <div className="editSurvey-details">
      <h2>Survey Details</h2>

      <div className="details-container">
        <div className="details-instance">
          <h4>Title:</h4>
          <span>{ name }</span>
        </div>

        <div className="details-instance">
          <h4>ID:</h4>
          <span>{surveyID}</span>
        </div>

        <div className="details-instance">
          <h4>Created:</h4>
          <span>{moment(created_at).fromNow()}</span>
        </div>

        <div className="details-instance">
          <h4>Last updated:</h4>
          <span>{moment(updated_at).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetailsSidebar;
