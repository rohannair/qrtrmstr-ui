import React from 'react';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import StyleButton from './StyleButton';

const StyleControls = ({ editorState, blockTypes, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const buttons = blockTypes.map((type) =>
    <StyleButton
      key={ type.label }
      active={ type.style === blockType }
      onToggle={ onToggle }
      { ...type }
    />
  );

  return (
    <ButtonGroup>
      { buttons }
    </ButtonGroup>
  );
};

export default StyleControls;
