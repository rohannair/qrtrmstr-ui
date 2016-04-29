import React, { Component, PropTypes } from 'react';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import { StickyContainer, Sticky } from 'react-sticky';

import NavGrid from '../NavGrid';

const SurveyEditorSidebar = (props) => {

  const opts = [
    { id: 'text', name: 'text', uri: '#', icon: 'copywriting' },
    { id: 'option', name: 'option', uri: '#', icon: 'grid-two-up' },
  ];

  return (
    <Sticky className={'newSticky'}>
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
    </Sticky>
  );
};

export default SurveyEditorSidebar;
