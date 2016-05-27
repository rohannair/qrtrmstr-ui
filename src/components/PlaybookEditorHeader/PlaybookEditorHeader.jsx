import React from 'react';
import styles from './playbookEditorHeader.css';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

const PlaybookEditorHeader = (props) => {
  const downClick = (dir) => props.moveSlide(props.val, dir);

  return (
    <div className="playbookEditorHeader">
      { props.children }
      <div className="arrows">
        <ButtonGroup vertical>
          <Button classes="tertiary xs" icon="arrow-up" onClick={downClick.bind(this, 0) } />
          <Button classes="tertiary xs" icon="arrow-down" onClick={downClick.bind(this, 1) } />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PlaybookEditorHeader;
