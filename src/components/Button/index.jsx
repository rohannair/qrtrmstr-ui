import React from 'react';
import classNames from 'classnames';
import styles from './button.css';

const Button = ({
  children,
  classes = null,
  text,
  onClick
}) => {
  const buttonClasses = classNames('btn', classes);
  return (
    <button
      className={ buttonClasses }
      onClick={ onClick}>
      { children || text }
    </button>
  );
};

export default Button;
