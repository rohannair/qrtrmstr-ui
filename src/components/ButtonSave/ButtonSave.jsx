import React, { Component, PropTypes } from 'react';
import styles from './buttonSave.css';

import Button from '../Button';

const ButtonSave = (props) =>
  props.inProgress
    ? <div className="buttonSave">Saving...</div>
    : <Button { ...props } />;

ButtonSave.propTypes = {
  center: PropTypes.bool,
  classes: PropTypes.string,
  text: PropTypes.string,
  toolTipText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  inProgress: PropTypes.bool
};

export default ButtonSave;
