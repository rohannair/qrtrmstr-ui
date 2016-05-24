import React from 'react';
import styles from './playbookEditorHeader.css';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

const PlaybookEditorHeader = (props) => {
  return (
    <div className="playbookEditorHeader">
      { props.children }
      <div className="arrows">
        <ButtonGroup vertical>
          <Button classes="tertiary xs" icon="arrow-up" />
          <Button classes="tertiary xs" icon="arrow-down" />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PlaybookEditorHeader;
