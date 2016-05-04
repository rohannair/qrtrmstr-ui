import React, { Component } from 'react';
import styles from './slideIntro.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import TextBox from '../TextBox';

const SlideIntro = (props) => {

  const { heading, body, slide_number, id, onChange, textAlign } = props;

  return (
    <div className="slideIntro">
      <div className="slideEquipment">
        <div className="slide-input">
          <strong>Heading:</strong>
          <input
            name="heading"
            value={ heading }
            onChange={ e => onChange(e.target.name, e.target.value, slide_number) }
          />
        </div>
      </div>
      <TextBox slideNum={ slide_number } body={ body } textAlign={ textAlign } updateSlide={ onChange } />
    </div>
  );
};

export default SlideIntro;
