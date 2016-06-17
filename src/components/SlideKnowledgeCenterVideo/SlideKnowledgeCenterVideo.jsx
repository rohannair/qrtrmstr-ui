import React from 'react';
import styles from './slideKnowledgeCenterVideo.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const SlideKnowledgeCenterVideo = ({ val, i, deleteItem, onChange }) => {

  const youtubeLinkType = val.id.indexOf('youtube') > -1
  ? val.id.replace(/watch\?v=/i, 'embed/')
  : `//www.youtube.com/embed/${ val.id }`;

  return (
    <div className="knowledgeCenterItem">
      <iframe src={ youtubeLinkType } />

      <div className="formField">
        <label>Title:</label>
        <input
          name="name"
          value={ val.name }
          onChange={ e => onChange(i, e.target.name, e.target.value) }
        />
      </div>

      <div className="formField">
        <label>YouTube URL or ID:</label>
        <input
          name="id"
          value={ val.id }
          onChange={ e => onChange(i, e.target.name, e.target.value) }
        />
      </div>

      <ButtonGroup className="deleteVideo" >
        <Button
          classes="tertiary sm"
          onClick={ deleteItem.bind(this, i) }
          icon="times"
        />
      </ButtonGroup>
    </div>
  );
};

export default SlideKnowledgeCenterVideo;
