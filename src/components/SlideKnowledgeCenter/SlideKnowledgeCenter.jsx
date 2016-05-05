import React, { Component } from 'react';
import styles from './slideKnowledgeCenter.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import SlideKnowledgeCenterItem from '../SlideKnowledgeCenterItem';
import { updatePlaybookState } from '../../actions/playbookViewActions';
import TextBox from '../TextBox';

class SlideKnowledgeCenter extends Component {
  state = {
    options: this.props.body.options || [],
    textAlign: this.props.body.textAlign || 'left'
  };

  render() {

    const { slide_number, heading, body } = this.props;
    const opts = this.state.options.map((val, i) => <SlideKnowledgeCenterItem i={i} val={ val } deleteVideo={this._deleteVideo} key={i} onChange={this._changeVideoParams} />);

    return (
      <div className="slideKnowledgeCenter">

        <div className="slideKnowledgeCenterIntro">
          <TextBox slideNum={ slide_number } body={ body } textAlign={ this.state.textAlign } bodyKey="desc" updateSlide={ this._updateKnowledgeCenterState  } />
        </div>

        <div className="videos">
          { opts }
        </div>

        <div className="addVideo">
          <ButtonGroup>
            <Button
            classes="primary sm"
            onClick={ this._newVideo }
            icon="plus">
              &nbsp;&nbsp;New
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  _updateKnowledgeCenterState = (key, value) => {
    const { body, slide_number, onChange } = this.props;
    const updatedSlide = {
      ...body,
      [key]: value
    };
    return onChange('body', updatedSlide, slide_number);
  };

  _changeVideoParams = (ind, key, val) => {
    const { options } = this.state;

    const editedVideoParams = [
      ...options.slice(0, ind),
      {
        ...options[ind],
        [key]: val
      },
      ...options.slice(ind + 1),
    ];

    this.setState({
      options: editedVideoParams
    });

    this._updateKnowledgeCenterState('options', editedVideoParams);
  };

  _deleteVideo = (id) => {
    // Needs a dialog
    const { options } = this.state;

    const newDeletedOptions = [
      ...options.slice(0, id),
      ...options.slice(id + 1)
    ];

    this.setState({
      options: newDeletedOptions
    });

    this._updateKnowledgeCenterState('options', newDeletedOptions);
  };

  _newVideo = () => {
    const newItem = [
      ...this.state.options,
      {
        id: 'Enter YouTube ID',
        name: 'Enter title'
      }
    ];

    this.setState({
      options: newItem
    });

    this._updateKnowledgeCenterState('options', newItem);
  };

  _saveSection = (id) => {
    // call save here
  };

}

export default SlideKnowledgeCenter;
