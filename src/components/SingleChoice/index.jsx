import React from 'react';

import styles from './singleChoice.css';

const SingleChoice = props => {
  return (
    <label className="singleChoice">
      <input name={props.name} type="radio" />
      {props.children}
    </label>
  );
};

export default SingleChoice;
