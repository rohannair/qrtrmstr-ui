import React, { PropTypes } from 'react';
import styles from './alert.css';

import Button from '../Button';
import classNames from 'classnames';

const Alert = (props) => {
  const classes = classNames(
    'alert',
    {
      success: props.success,
      info: props.info,
      warning: props.warning,
      danger: props.danger
    }
  );

  const closeBtn = props.closeAlert
  ? <div className="closeBtn">
        <Button
          onClick={ props.closeAlert }
          classes='sm transparent'
          icon='times'
        />
      </div>
  : null;

  return (
    <div className={ classes }>
      <div className="content">
        { props.children }
      </div>
      { closeBtn }
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  closeAlert: PropTypes.func
};

export default Alert;
