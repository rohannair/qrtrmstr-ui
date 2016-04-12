import React, { Component } from 'react';
import styles from './slideKnowledgeCenter.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import SlideKnowledgeCenterItem from '../SlideKnowledgeCenterItem';

import { randHex } from '../../utils/coolFunctions';

class SlideKnowledgeCenter extends Component {
  state = {
    options: this.props.options || []
  };

  render() {
    const opts = this.state.options.map((val, i) => <SlideKnowledgeCenterItem i={i} val={ val } deleteVideo={this._deleteVideo} key={i} onChange={this._changeVideoParams} />);

    return (
      <div className="slideKnowledgeCenter">
        <div className="videos">
          { opts }
        </div>

        <div className="addVideo">
          <ButtonGroup>
            <Button
            classes="inverse sm"
            onClick={ this._saveVideo }
            icon="check">
              &nbsp;&nbsp;Save
            </Button>

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

  _changeVideoParams = (ind, key, val) => {
    const { options } = this.state;

    this.setState({
      options: [
        ...options.slice(0, ind),
        {
          ...options[ind],
          [key]: val
        },
        ...options.slice(ind + 1),
      ]
    });
  };

  _deleteVideo = (id) => {
    // Needs a dialog
    const { options } = this.state;

    this.setState({
      options: [
        ...options.slice(0, id),
        ...options.slice(id + 1)
      ]
    });
  };

  _newVideo = () => {
    this.setState({
      options: [
        ...this.state.options,
        {
          id: 'Enter YouTube ID',
          name: 'Enter title'
        }
      ]
    });
  };

  _saveSection = (id) => {
    // call save here
  };


}

export default SlideKnowledgeCenter;
