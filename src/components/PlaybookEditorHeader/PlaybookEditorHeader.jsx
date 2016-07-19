import React from 'react';
import styles from './playbookEditorHeader.css';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

const PlaybookEditorHeader = (props) => {
  const downClick = (dir) => props.moveSlide(props.val, dir);
  const visiblity = !!props.hidden;
  const visibilityMessage = visiblity ? 'Show Card' : 'Hide Card';

  return (
    <div className="playbookEditorHeader">

      <div className="arrows">
        <ButtonGroup vertical>
          <Button classes="tertiary xs" icon="arrow-up" onClick={downClick.bind(this, 0) } />
          <Button classes="tertiary xs" icon="arrow-down" onClick={downClick.bind(this, 1) } />
        </ButtonGroup>
      </div>

      { `Section ${parseInt(props.val) + 1} (${props.slideType})` }

      <div className="actions">
        <ButtonGroup>
          <Button classes="tertiary sm" onClick={props.toggleVisibility.bind(this, props.val)}>{ visibilityMessage }</Button>
        </ButtonGroup>
      </div>

    </div>
  );
};

export default PlaybookEditorHeader;
