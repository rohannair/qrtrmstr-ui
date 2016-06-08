import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import styles from './playbookEditorSidebar.css';

import NavGrid from '../NavGrid';

const PlaybookEditorSidebar = (props) => {

  const opts = [
    { id: 'text', name: 'text', uri: '#', icon: 'copywriting' },
    { id: 'option', name: 'option', uri: '#', icon: 'grid-two-up' },
  ];
  return (
    <div className="playbookEditor-sidebar">
      <Card title="Actions">
        <ButtonGroup vertical>
          <Button
            onClick={ props.save }
            classes='primary block lglong'
          >Save</Button>
          <Link to={`/playbook/${props.id}`} className='btn tertiary block md'>
              Preview Playbook
          </Link>
        </ButtonGroup>
      </Card>

      <Card title="Add cards">
        <ButtonGroup vertical>
          <NavGrid opts={ opts } onClick={ props.onClick }/>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default PlaybookEditorSidebar;
