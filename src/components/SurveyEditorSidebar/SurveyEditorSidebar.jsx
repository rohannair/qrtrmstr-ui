import React, { Component, PropTypes } from 'react';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import NavGrid from '../NavGrid';

const SurveyEditorSidebar = (props) => {

  const opts = [
    { id: 'text', name: 'text', uri: '#', icon: 'text' },
    { id: 'option', name: 'option', uri: '#', icon: 'list' },
    { id: 'html', name: 'HTML', uri: '#', icon: 'code' }
  ];

  return (
    <div className="editSurvey-sidebar">
      <h3>Add slides</h3>
      <ButtonGroup vertical={true}>
        <NavGrid opts={opts} />
      </ButtonGroup>
    </div>
  );
};

export default SurveyEditorSidebar;
