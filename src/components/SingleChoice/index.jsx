import React from 'react';

const SingleChoice = props => {
  return (
    <label className="singleChoice">
      <input name={props.name} type="radio" />
      {props.children}
    </label>
  );
};

export default SingleChoice;
