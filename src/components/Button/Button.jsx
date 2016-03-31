import React from 'react';
import classNames from 'classnames';
import styles from './button.css';

import Tooltip from '../../components/Tooltip';

const Button = ({center = false, children, classes = null, text, toolTipText, onClick, icon, iconPos = null }) => {
  const buttonClasses = classNames('btn', classes, {'btn-icon': icon}, {'btn-icon-center': center});
  const tooltip = (toolTipText)
    ? <Tooltip>{toolTipText}</Tooltip>
    : null;
  const iconEl = icon
    ? <i className={`oi ${iconPos}`} data-glyph={icon} />
    : null;

  return (
    <button
      className={ buttonClasses }
      onClick={ onClick}>
      { iconEl }
      { tooltip }
      { children || text }
    </button>
  );
};

export default Button;
