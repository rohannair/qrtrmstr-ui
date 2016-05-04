import React from 'react';
import styles from './surveyTextCard.css';

import Card from '../../components/Card';
import SurveyCardFooter from '../../components/SurveyCardFooter';

const SurveyTextCard = (props) => {
  return (
    <Card key={props.type} footer={<div/>}>
      <h2>{ props.heading }</h2>
      <div
        className = {props.textAlign || ''}
        dangerouslySetInnerHTML={{__html: props.body}}
      />
    </Card>
  );
};

export default SurveyTextCard;
