import React, { PropTypes } from 'react';
import styles from './modal.css';

import classnames from 'classnames';

const Modal = (props) => {
  const classes = classnames({
    'modal-inner': true,
    xl: props.xl,
    lg: props.lg,
    md: props.md,
    sm: props.sm || props.xs
  });

  return (
    <div className='modal' onClick={ props.onClose }>
      <div className={ classes } onClick={e => e.stopPropagation()}>
        { props.children }
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;
