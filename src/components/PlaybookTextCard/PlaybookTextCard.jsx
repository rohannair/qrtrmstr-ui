import React from 'react';
import styles from './playbookTextCard.css';

import Card from '../../components/Card';
import PlaybookCardFooter from '../../components/PlaybookCardFooter';

const PlaybookTextCard = (props) => {
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

export default PlaybookTextCard;
