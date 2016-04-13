import React from 'react';
import styles from './surveyEditorBody.css';

import Card from '../Card';
import SurveyEditorSlide from '../SurveyEditorSlide';

const SurveyEditorBody = ({ children }) => {
  const slideCountCopy = `${[].concat(children).length} section${[].concat(children).length > 1 ? 's' : ''}` || 0;
  return (
    <div className="surveyEditorBody surveyEditor-body">
      <div className="survey-slideCount">{ slideCountCopy }</div>
        { children }
    </div>
  );
};

export default SurveyEditorBody;
