import React, { PropTypes } from 'react';
import styles from './indicator.css';

import classNames from 'classnames';

const Indicator = (props) => {
  const classes = classNames(
    'indicator',
    {
      success: props.success,
      warning: props.warning,
      danger: props.danger,
      info: props.info
    }
  );

  return (
    <div
      className={ classes }
      onMouseEnter={ props.onHover }
      onMouseLeave={ props.onOut }
    >
      { props.children }
    </div>
  );
};

Indicator.proptypes = {
  onHover: PropTypes.func,
  onOut: PropTypes.func
};

export default Indicator;
