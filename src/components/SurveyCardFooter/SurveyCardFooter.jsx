import React from 'react';
import styles from './surveyCardFooter.css';

import Button from '../../components/Button';

const SurveyCardFooter = (props) => {
  return (
    <div className="nextButton">
      <Button classes={'lgLong primary'}>Next</Button>
    </div>
  );
};

export default SurveyCardFooter;
