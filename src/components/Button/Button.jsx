import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './button.css';

import Tooltip from '../../components/Tooltip';

class Button extends Component {
  state = {
    showTooltip: false
  };

  render() {
    const {
      center = false,
      children,
      classes = null,
      text,
      toolTipText,
      onClick,
      icon,
      iconPos = null
    } = this.props;

    const buttonClasses = classNames(
      'btn',
      classes,
      { 'btn-icon': icon },
      { 'btn-icon-center': center || !children }
    );

    const tooltip = this.state.showTooltip && toolTipText
      ? <Tooltip>{toolTipText}</Tooltip>
      : null;

    const iconEl = icon
      ? <i className={`fa fa-${icon} ${iconPos || '' }`} />
      : null;

    return (
      <div
        className={ buttonClasses }
        onClick={ onClick }
        onMouseEnter={ this._showTooltip }
        onMouseLeave={ this._showTooltip }
      >
        { iconEl }
        { tooltip }
        { children || text }
      </div>
    );
  };

  _showTooltip = e => {
    this.setState({showTooltip: !this.state.showTooltip});
  };
};

export default Button;
