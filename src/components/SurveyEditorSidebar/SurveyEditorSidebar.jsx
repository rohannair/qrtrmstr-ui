import React, { Component, PropTypes } from 'react';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import NavGrid from '../NavGrid';

const SurveyEditorSidebar = (props) => {

  const opts = [
    { id: 'text', name: 'text', uri: '#', icon: 'copywriting' },
    { id: 'option', name: 'option', uri: '#', icon: 'grid-two-up' },
    { id: 'check', name: 'checklist', uri: '#', icon: 'task' },
    { id: 'html', name: 'HTML', uri: '#', icon: 'code' },
  ];

  return (
    <div className="editSurvey-sidebar">
      <Card>
        <Button
          onClick={ props.save }
          classes='inverse block xl'
        >Save</Button>
      </Card>
      <Card>
        <h3>Add slides</h3>
        <ButtonGroup vertical={ true }>
          <NavGrid opts={ opts } onClick={ props.onClick }/>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default SurveyEditorSidebar;