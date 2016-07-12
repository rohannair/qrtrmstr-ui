import React from 'react';
import styles from './pill.css';

import classnames from 'classnames';

const Pill = (props) => {
  const classes = classnames({
    pill: true,
    success: props.success,
    info: props.info,
    warning: props.warning,
    danger: props.danger
  },
  props.className
  );
  return (
    <span className={classes}>
      { props.children }
    </span>
  );
};

export default Pill;
