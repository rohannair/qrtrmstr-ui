import React from 'react';
import classNames from 'classnames';

import styles from './surveyFormCard.css';

import Card from '../../components/Card';
import SurveyCardFooter from '../../components/SurveyCardFooter';

const SurveyFormCard = ({ heading, contents, onClick, selected }) => {
  const { type, options } = contents;
  return (
    <Card footer={<SurveyCardFooter />}>
      <h2>{heading}</h2>
      <div className={type}>
        { FormTypes[type](options, onClick, selected) }
      </div>
    </Card>
  );
};

const FormTypes = {
  imageSelector: (opts, onClick, selected) => {
    return opts.map(({id, imageUri, title, body}) => {

      const classes = classNames(
        'imageSelector-option',
        id === selected ? 'selected' : ''
      );

      return (
        <a
          key={'opt' + id}
          className={ classes }
          onClick={onClick.bind(this, id)}
        >
          {
            imageUri
            ? <img src={imageUri} />
            : <div className="img-placeholder" />
          }
          <h3>{ title }</h3>
          <p>{ body }</p>
        </a>
      );
    });
  }
};

export default SurveyFormCard;
