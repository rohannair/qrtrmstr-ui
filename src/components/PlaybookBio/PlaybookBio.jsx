import React from 'react';
import styles from './playbookBio.css';

const PlaybookBio = (props) => {
  const bodyOpts = props.body.options;
  const profilePic = bodyOpts.profile_image
    ? (<div className="upload-img">
        <i className="material-icons">cloud_upload</i>
        <span>Upload a profile picture</span>
      </div>)
    : null;

  const bio = bodyOpts.bio
    ? <textarea placeholder="Tell the team a little bit about yourself..."/>
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
          { profilePic }
        </div>
        <div className="bio-form">
          <h3>{ props.userInfo.firstName + ' ' + props.userInfo.lastName}</h3>
          <p>User Experience Designer - <a href="#">rachel.galaxy@scotiabank.com</a></p>
          { bio }
          { social }
        </div>
      </div>
    </div>
  );
};

export default PlaybookBio;
