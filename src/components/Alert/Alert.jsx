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
  return (
    <div className={ classes }>
      <div className="content">
        { props.children }
      </div>

      <div className="closeBtn">
        <Button
          onClick={ props.closeAlert }
          classes='sm transparent'
          icon='times'
        />
      </div>
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired
};

export default Alert;
