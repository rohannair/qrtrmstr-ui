import React, { Component, PropTypes } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

const SurveyEditorSidebar = (props) => {
  return (
    <div className="editSurvey-sidebar">
      <h3>Add slides</h3>
      <ButtonGroup vertical={true}>
        <Button classes='inverse block' icon="text">Text</Button>
        <Button classes='inverse block' icon="list">Option</Button>
        <Button classes='inverse block' icon="code">HTML</Button>
      </ButtonGroup>
    </div>
  );
};

export default SurveyEditorSidebar;
