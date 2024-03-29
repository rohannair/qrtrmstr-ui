import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Card from '../Card';
import Button from '../Button';
import ButtonSave from '../ButtonSave';
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
          <ButtonSave
            onClick={ props.save }
            classes='primary block md'
            saveStatus={ props.saveStatus }
            saveType=''
          />

          <Link
            to={`/playbook/${props.id}`}
            className="btn tertiary block md"
            target="_blank"
            rel="noopener"
          >
              Preview
          </Link>
        </ButtonGroup>
      </Card>

      <Card>
        <ButtonGroup vertical>
          <Button
            onClick={ props.insertNewSlide }
            classes='tertiary block md'
            >
            Insert Text Slide
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default PlaybookEditorSidebar;
