import React, { Component, PropTypes } from 'react';
import Button from '../Button';

const ButtonSave = (props) => {
  if (props.saveStatus === 'SAVING') {
    return (
      <Button
        children={`Saving ${props.saveType}`}
        classes={props.classes}
      />
    );
  } else if (props.saveStatus === 'SAVED') {
    return (
      <Button
        { ...props }
        children={`${props.saveType} Saved!`}
        classes="md inverse"
      />
    );
  };

  return (
    <Button
     { ...props }
     children={`Save ${props.saveType}`}
    />
  );
};

ButtonSave.propTypes = {
  center: PropTypes.bool,
  classes: PropTypes.string,
  text: PropTypes.string,
  toolTipText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string
};

export default ButtonSave;
