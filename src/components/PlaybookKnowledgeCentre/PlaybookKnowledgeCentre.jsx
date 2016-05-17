import React, { Component } from 'react';
import styles from './playbookKnowledgeCentre.css';

class PlaybookKnowledgeCentre extends Component {
  state = {
    selectedVideo: 0
  };

  render() {
    const { body, heading } = this.props;
    const { selectedVideo } = this.state;
    const changeVideo = this._changeVideo;

    const options = body.options.map((val, i) => {
      const classes = i === selectedVideo ? 'active option' : 'option';
      return (
        <div className={ classes } key={val.id} onClick={ changeVideo.bind(self, i) }>
          <i className="material-icons">ondemand_video</i>
          { val.name }
        </div>
      );
    });

    return (
      <div className="playbookKnowledgeCentre">
        <h2>{ heading}</h2>
        <p className = { body.textAlign || ''}>{ body.desc}</p>

        <div className="playlist">
          <div className="playlist-menu">
            <div className="playlist-header">
              <i className="material-icons">playlist_play</i>UX Designer Playlist
            </div>
            { options }
          </div>

          <div className="playlist-viewer">
            <iframe src={`http://www.youtube.com/embed/${ body.options[selectedVideo].id}`} />
          </div>
        </div>
        <div className="playlist-footer">
          { body.footer}
        </div>
      </div>
    );
  };

  _changeVideo = (idx) => this.setState({selectedVideo: idx});
};

export default PlaybookKnowledgeCentre;
