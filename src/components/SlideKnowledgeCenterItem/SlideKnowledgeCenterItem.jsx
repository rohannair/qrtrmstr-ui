import React from 'react';
import styles from './slideKnowledgeCenterItem.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const SlideKnowledgeCenterItem = ({ val, i, deleteVideo, onChange }) => {
  return (
    <div className="knowledgeCenterItem">
      <iframe src={`https://www.youtube.com/embed/${val.id}`} />

      <div className="formField">
        <label>Title:</label>
        <input
          name="title"
          value={ val.name }
          onChange={ e => onChange(i, e.target.name, e.target.value) }
        />
      </div>

      <div className="formField">
        <label>Video ID:</label>
        <input
          name="id"
          value={ val.id }
          onChange={ e => onChange(i, e.target.name, e.target.value) }
        />
      </div>

      <ButtonGroup>
        <Button
          classes="tertiary sm"
          onClick={ deleteVideo.bind(this, i) }
          icon="x"
        />
      </ButtonGroup>
    </div>
  );
};

export default SlideKnowledgeCenterItem;
