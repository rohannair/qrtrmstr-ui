import React from 'react';
import styles from './playbookEditorHeader.css';
import classNames from 'classnames';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

const PlaybookEditorHeader = (props) => {
  const downClick = (dir) => props.moveSlide(props.val, dir);
  const visibility = !!props.hidden;
  const visibilityMessage = visibility ? 'Show Card' : 'Hide Card';

  const classes = classNames(
    'playbookEditorHeader',
    {
      isHidden: visibility
    }
  );

  return (
    <div className={classes}>

      <div className="arrows">
        <ButtonGroup vertical>
          <Button classes="tertiary xs" icon="arrow-up" onClick={downClick.bind(this, 0) } />
          <Button classes="tertiary xs" icon="arrow-down" onClick={downClick.bind(this, 1) } />
        </ButtonGroup>
      </div>

      { `Section ${parseInt(props.val) + 1} (${props.slideType})` }
      { visibility ? <span className="danger"> HIDDEN CARD</span> : '' }

      <div className="actions">
        <ButtonGroup>
          <Button classes="tertiary sm" onClick={props.toggleVisibility.bind(this, props.val)}>{ visibilityMessage }</Button>
        </ButtonGroup>
      </div>

    </div>
  );
};

export default PlaybookEditorHeader;
