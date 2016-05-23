import React from 'react';
import classNames from 'classnames';
import styles from './buttonGroup.css';

const ButtonGroup = ({
  children,
  vertical,
  centre
}) => {
  const classes = classNames(
    'buttonGroup',
    {
      'buttonGroup-vertical': vertical,
      'buttonGroup-centre': centre
    });

  return (
    <div className={classes}>
      { children }
    </div>
  );
};

export default ButtonGroup;
