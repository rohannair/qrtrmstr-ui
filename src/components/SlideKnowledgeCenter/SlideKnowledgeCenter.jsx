import React, { Component } from 'react';
import styles from './slideKnowledgeCenter.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';

class SlideKnowledgeCenter extends Component {
  state = {
    options: this.props.options || []
  };

  render () {
    const opts = this.state.options.map((val, i) => {
      return (
        <div className="knowledgeCenterItem" key={i}>
          <iframe src={`https://www.youtube.com/embed/${val.id}`} />

          <div>
            <label>Title:</label>
            <input
              name="title"
              value={ val.name }
              onChange={(e) => {
                this.setState({
                  options: [
                    ...this.state.options.slice(0, i),
                    {
                      ...this.state.options[i],
                      name: e.target.value
                    },
                    ...this.state.options.slice(i + 1),
                  ]
                })
              }}
            />
          </div>

          <div>
            <label>Video ID:</label>
            <input
              name="videoId"
              defaultValue={ val.id }
              onChange={(e) => {
                this.setState({
                  options: [
                    ...this.state.options.slice(0, i),
                    {
                      ...this.state.options[i],
                      id: e.target.value
                    },
                    ...this.state.options.slice(i + 1),
                  ]
                })
              }}
            />
          </div>

          <ButtonGroup>
            <Button
              classes="tertiary sm"
              onClick={ this._deleteVideo.bind(this, i) }
              icon="x"
            />
          </ButtonGroup>
        </div>
      );
    });

    return (
      <div className="slideKnowledgeCenter">
        <div className="videos">
          { opts }
        </div>

        <div className="addVideo">
          <ButtonGroup>
            <Button classes="inverse sm" onClick={ this._saveVideo } icon="check" >&nbsp;&nbsp;Save</Button>
            <Button classes="primary sm" onClick={ this._newVideo } icon="plus" >&nbsp;&nbsp;New</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  _deleteVideo = (id) => {
    // Needs a dialog

    this.setState({
      options: [
      ...this.state.options.slice(0, id),
      ...this.state.options.slice(id + 1)
      ]
    });
  };

  _newVideo = () => {
    this.setState({
      options: [
        ...this.state.options,
        {
          id: Math.random(),
          name: null
        }
      ]
    })
  };

  _saveSection = (id) => {
    // call save here
  };


}

export default SlideKnowledgeCenter;
