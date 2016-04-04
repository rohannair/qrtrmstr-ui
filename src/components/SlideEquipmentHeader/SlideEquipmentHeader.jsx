import React from 'react';
import styles from './slideEquipmentHeader.css';

import Button from '../Button';

const SlideEquipmentHeader = ({ vals, onClick, onNew, selected, onRemove }) => {
  const opts = vals.map(val => {
    const classes = val.id === selected ? 'tab active' : 'tab';
    return (
      <div
        className={ classes }
        key={ val.id }
      >
        <span className="tabText " onClick={ onClick.bind(this, val.id) }>{ val.name }</span>
        <Button classes="removeBtn transparent xs" onClick={ onRemove.bind(this, val.id) }>&times;</Button>
      </div>
      );
  });

  return (
    <div className="slideEquipmentHeader">
      {opts}
      <div className="tab newTab" onClick={ onNew }>+</div>
    </div>
  );
}

export default SlideEquipmentHeader;
