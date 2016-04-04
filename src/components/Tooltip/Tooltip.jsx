import React from 'react';
import classNames from 'classnames';
import styles from './tooltip.css';

const Tooltip = ({
  children,
}) => {

  return (
    <div
    className="tooltip"
    >
      { children }
    </div>
  );
};

export default Tooltip;
