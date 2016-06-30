import React from 'react';
import Button from '../../components/Button';
import classnames from 'classnames';

const StyleButton = ({ active, icon, label, onToggle, style }) => {

  const classes = classnames(
    { transparent: !!icon },
    'RichEditor-styleButton',
    { 'RichEditor-activeButton': !!active }
  );

  const content = icon
  ? <Button center={true} classes='transparent subList' icon={ icon} />
  : <span className="subOptions">{ label }</span>;

  return (
    <div className={ classes } onMouseDown={ onToggle.bind(this, style) } >
     { content }
    </div>
  );
};

export default StyleButton;
