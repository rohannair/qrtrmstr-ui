import React from 'react';
import styles from './surveyEditorBody.css';

import Card from '../Card';
import SurveyEditorSlide from '../SurveyEditorSlide';

const SurveyEditorBody = ({survey, onClick, openItems}) => {
  const slides = Object.keys(survey).map((id, i) => {
    const {type, heading, body, slide_number} = survey[id];
    return (
      <SurveyEditorSlide
        count={slide_number + 1}
        key={id}
        id={id}
        type={type}
        heading={heading}
        body={body}
        onClick={onClick}
        isOpen={openItems.indexOf(id) > -1}
      />
    );
  });

  const slideCountCopy = `${Object.keys(survey).length} slide${Object.keys(survey).length > 1 ? 's' : ''}`;
  return (
    <div className="surveyEditorBody editSurvey-body">
      <div className="survey-slideCount">{ slideCountCopy }</div>
      { slides }
    </div>
  );
};

export default SurveyEditorBody;
