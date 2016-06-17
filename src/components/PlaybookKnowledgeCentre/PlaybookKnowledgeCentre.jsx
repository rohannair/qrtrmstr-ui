import React, { Component } from 'react';
import styles from './playbookKnowledgeCentre.css';

import Button from '../Button';

class PlaybookKnowledgeCentre extends Component {
  state = {
    selected: this.props.body.options[0].id,
    selectedType: this.props.body.options[0].type
  };

  render() {
    const { body, heading } = this.props;
    const { selected } = this.state;
    const changeVideo = this._changeVideo;

    const videoOptions = body.options
      .filter(val => val.type === 'youtube')
      .map((val, i) => {
        const classes = val.id === selected ? 'active option' : 'option';
        return (
          <div className={ classes } key={val.id} onClick={ changeVideo.bind(self, val.id, val.type) }>
            <i className="material-icons">ondemand_video</i>
            { val.name }
          </div>
        );
      });

    const videoSection = videoOptions.length > 0
      ? (
        <div className="playlist-videos">
          <div className="playlist-header">
            <i className="material-icons">playlist_play</i>Videos
          </div>
          { videoOptions }
        </div>
      )
      : null;


    const linkOptions = body.options
      .filter(val => val.type === 'link')
      .map((val, i) => {
        const classes = val.id === selected ? 'active option' : 'option';
        return (
          <div className={ classes } key={val.id} onClick={ changeVideo.bind(self, val.id, val.type) }>
            <i className="material-icons">insert_drive_file</i>
            { val.name }
          </div>
        );
      });

    const linkSection = linkOptions.length > 0
    ? (
        <div className="playlist-links">
          <div className="playlist-header">
            <i className="material-icons">playlist_play</i>Docs
          </div>
          { linkOptions }
        </div>
      )
      : null;

    const selectedLink = this.state.selectedType === 'link'
    ? this._validateLink(body.options.filter(val => val.id === selected)[0].link)
    : null;

    let renderedLink = null;
    if (this.state.selectedType === 'youtube') {
      const youtubeLinkType = selected.indexOf('youtube') > -1
      ? selected.replace(/watch\?v=/i, 'embed/')
      : `//www.youtube.com/embed/${ selected }`;
      renderedLink = <iframe src={ youtubeLinkType } />;
    } else {
      renderedLink = (
        <div className="viewLink">
          <Button classes="xl primary">
            <a style={{color: '#fff', borderRadius: '100%'}}href={selectedLink} target="_blank">
              View Document
            </a>
          </Button>
            <small>{selectedLink}</small>
        </div>
      );
    }

    return (
      <div className="playbookKnowledgeCentre">
        <h2>{ heading }</h2>
        <div className = { body.textAlign || ''} dangerouslySetInnerHTML={{__html: body.desc}} />

        <div className="playlist">
          <div className="playlist-menu">
            { videoSection }
            { linkSection }
          </div>

          <div className="playlist-viewer">
            { renderedLink }
          </div>
        </div>
        <div className="playlist-footer">
          { body.footer}
        </div>
      </div>
    );
  };

  _changeVideo = (id, type) => this.setState({ selected: id, selectedType: type});

  _validateLink = (link) => link.indexOf('https://') > -1 || link.indexOf('http://') > -1 ? link : 'https://' + link;
};

export default PlaybookKnowledgeCentre;
