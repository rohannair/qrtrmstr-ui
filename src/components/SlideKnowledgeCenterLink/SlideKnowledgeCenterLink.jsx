import React from 'react';
import styles from './slideKnowledgeCenterLink.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const SlideKnowledgeCenterLink = (props) => {
  const { name, link, i, deleteItem, onChange } = props;
  return (
    <div className="knowledgeCenterItem">
      <div className="knowledgeCenterItem-link">
        <i className="material-icons">insert_link</i>
      </div>
      <div className="formField">
        <label>Title:</label>
        <input
          name="name"
          value={ props.name }
          onChange={ e => onChange(i, e.target.name, e.target.value) }
        />
      </div>

      <div className="formField">
        <label>Link:</label>
        <input
          name="link"
          value={ props.link }
          onChange={ e => onChange(i, e.target.name, e.target.value) }
        />
      </div>

      <ButtonGroup className="deleteVideo" >
        <Button
          classes="tertiary sm"
          onClick={ props.deleteItem.bind(this, i) }
          icon="times"
        />
      </ButtonGroup>
    </div>
  );
};

export default SlideKnowledgeCenterLink;
