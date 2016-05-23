import React from 'react';
import classNames from 'classnames';
import styles from './buttonGroup.css';

const ButtonGroup = ({
  children,
  vertical
}) => {
  const classes = classNames('buttonGroup', {'buttonGroup-vertical': vertical});

  return (
    <div className={classes}>
      { children }
    </div>
  );
};

export default ButtonGroup;
