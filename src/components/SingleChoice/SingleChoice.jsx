import React from 'react';

import styles from './singleChoice.css';

const SingleChoice = props => {  

  return (
  	<div className="selection">
      <div className="imageContainer">
        <img className="thumbnail" src={props.context.img} />
      </div>
      <label className="singleChoice">
        <input name={props.name} type="radio" />
        {props.children}
      </label>
    </div>
  );
};

SingleChoice.defaultProps = {
  context: {
    img: ''
  }
}

export default SingleChoice;
