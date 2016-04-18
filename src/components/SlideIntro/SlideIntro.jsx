import React, { Component } from 'react';
import styles from './slideIntro.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import TextBox from '../TextBox';

const SlideIntro = (props) => {

  const { heading, body, slide_number, id } = props;

  return (
    <div className="slideIntro">
      <h2>{ heading }</h2>
      <TextBox body={ body } />
    </div>
  );
};

export default SlideIntro;

// <div dangerouslySetInnerHTML={{ __html: body }} />
