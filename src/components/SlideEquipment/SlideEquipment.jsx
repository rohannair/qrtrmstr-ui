import React from 'react';
import styles from './slideEquipment.css';

const SlideEquipment = (props) => {
  return (
    <div className="slideEquipment">
      <h1>{props.heading}</h1>
      <p>{props.body.desc}</p>
      { props.body.options.map(val => <div>{val}</div>) }
      { JSON.stringify(props.body) }
    </div>
  );
};

export default SlideEquipment;
