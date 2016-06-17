import React, { Component } from 'react';
import styles from './slideKnowledgeCenter.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import SlideKnowledgeCenterVideo from '../SlideKnowledgeCenterVideo';
import SlideKnowledgeCenterLink from '../SlideKnowledgeCenterLink';
import { updatePlaybookState } from '../../actions/playbookViewActions';
import TextBox from '../TextBox';

class SlideKnowledgeCenter extends Component {
  state = {
    options: this.props.body.options || [],
    textAlign: this.props.body.textAlign || 'left'
  };

  render() {

    const { slide_number, heading, body } = this.props;
    const opts = this.state.options.map((val, i) => {
      return val.type === 'link'
      ? <SlideKnowledgeCenterLink i={i} key={`link-${i}`} i={i} {...val} deleteItem={this._deleteItem} onChange={this._changeParams} />
      : <SlideKnowledgeCenterVideo i={i} val={ val } deleteItem={this._deleteItem} key={`video-${i}`} onChange={this._changeParams} />;
    });

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
            onClick={ this._newItem.bind(this, 'youtube') }
            icon="play">
              &nbsp;&nbsp;New Video
            </Button>

            <Button
            classes="primary sm"
            onClick={ this._newItem.bind(this, 'link') }
            icon="link">
              &nbsp;&nbsp;New Link
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

  _changeParams = (ind, key, val) => {
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

  _deleteItem = (id) => {
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

  _newItem = (type) => {
    const itemTempl = type === 'link'
    ? {
      id: this.state.options.length + 1,
      name: '',
      link: '',
      type: type
    }
    : {
      id: '',
      name: '',
      type: type
    };

    const newItem = [
      ...this.state.options,
      itemTempl
    ];

    this.setState({
      options: newItem
    });

    this._updateKnowledgeCenterState('options', newItem);
  };

}

export default SlideKnowledgeCenter;
