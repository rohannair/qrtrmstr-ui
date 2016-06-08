import React, { Component } from 'react';
import styles from './playbookBio.css';
import Button from '../Button';

import Uploader from '../../containers/Uploader';

const PlaybookBio = (props) => {

  const { slideKey } = props.findSlideKey(props.slide_number);
  const currentBio = props.submittedDoc[slideKey].body.options.bio;
  const bodyOpts = props.body.options;
  const profilePic = bodyOpts.profile_image
  ? (<Uploader>
        <i className="material-icons">cloud_upload</i>
        <span>Upload a profile picture</span>
      </Uploader>)
  : null;

  const bio = bodyOpts.bio
  ? <textarea value={currentBio} name={props.slide_number} onChange={ e => props.onChange(e.target.name, 'bio', e.target.value) } placeholder="Tell the team a little bit about yourself..."/>
  : null;

  const facebook = bodyOpts.facebook
  ? <li className="fb">Link your Facebook</li>
  : null;

  const twitter = bodyOpts.twitter
  ? <li className="tw">Link your Twitter</li>
  : null;

  const linkedin = bodyOpts.linkedin
  ? <li className="li">Link your LinkedIn</li>
  : null;

  const social = (facebook || twitter || linkedin)
  ? (
    <div className="social-media">
      { facebook }
      { twitter }
      { linkedin }
    </div>
  )
  : null;

  return (
    <div className="playbookBio">
      <h2>Fill out your profile</h2>
      <div className="bio">
        <div className="bio-info">
          { props.children }
        </div>
        <div className="bio-form">
          <h3>{ props.userInfo.firstName + ' ' + props.userInfo.lastName}</h3>
          { bio }
          { social }
          <div className="slideFooter">
            <Button classes="primary sm" onClick={props.onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookBio;
