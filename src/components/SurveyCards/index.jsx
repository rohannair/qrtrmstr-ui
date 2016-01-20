import React from 'react';
import styles from './surveyCard.css';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';
import SurveyFormCard from '../../components/SurveyFormCard';
import SurveyTextCard from '../../components/SurveyTextCard';

const SurveyCards = (props) => {
  const { fields, onClick, onSubmit, selected } = props;
  const cards = [...fields].map((val) => {
    if (!!val.form) {
      return (
        <SurveyFormCard
          key = { val.id }
          onClick = { clickHandler(val.id, onClick) }
          selected = { selected[val.id] }
          {...val}
        />
      );
    }

    return <SurveyTextCard key={val.id} {...val} />;
  });

  return (
    <div className="container container-survey">
      { cards }
      <Card>
        <Button
          classes='xl primary'
          onClick={onSubmit}
        >
          Submit Form
        </Button>
      </Card>
    </div>
  );
};

const clickHandler = (id, cb) => val => cb({key: id, val});

export default SurveyCards;
