import React, { Component } from 'react';
import styles from './playbookBio.css';
import Button from '../Button';
import moment from 'moment';

import Uploader from '../../containers/Uploader';

const PlaybookBio = (props) => {
  const { slideKey } = props.findSlideKey(props.slide_number);
  const currentBio = props.submittedDoc ? props.submittedDoc[slideKey].body.options.bio : '';
  const bodyOpts = props.body.options;
  const profilePic = bodyOpts.profile_image
  ? (<Uploader>
        <i className="material-icons">cloud_upload</i>
        <span>Upload a profile picture</span>
      </Uploader>)
  : null;

  let bio = null;
  if (bodyOpts.bio && props.submittedDoc) {
    bio = <textarea value={currentBio} name='bio' onChange={ e => props.onChange(props.slide_number, e.target.name, e.target.value) } placeholder="Tell the team a little bit about yourself..."/>;
  } if (bodyOpts.bio && !props.submittedDoc) {
    bio = <textarea placeholder="Tell the team a little bit about yourself..."/>;
  }

  const socOptions = {
    facebook: 'Facebook Url',
    twitter: '@Twitter handle or url',
    linkedin: 'LinkedIn url'
  };

  const socLinks = Object.keys(socOptions).map(val => {
    const socVal = socOptions[val];
    let socClass = val.slice(0,2);
    const currVal = props.submittedDoc ? props.submittedDoc[slideKey].body.options[val] : '';

    if (props.body.options[val] === true) {
      return (
        <div key={val} className="socMedia">
          <div className={`iconBox ${socClass}`}>
            <i className={`fa fa-${val}`}></i>
          </div>
          <input value={ currVal }
            name={val}
            placeholder={socVal}
            onChange={ e => props.onChange(props.slide_number, e.target.name, e.target.value) } />
        </div>
      );
    }
    return null;

  });

  const social = socLinks
  ? (
    <div className="social-media">
      { socLinks }
    </div>
  )
  : null;

  const submitTime = props.message === slideKey
  ? <div className="saveMessage">{`Saved on ${moment().format('MMMM Do YYYY, H:mm')}`}</div>
  : null;

  const loading = props.loading && props.loading.status && props.loading.slideKey === slideKey
  ? <div className="saveMessage">Saving...</div>
  : null;

  return (
    <div className="playbookBio">
      <h2>{ props.body.heading }</h2>
      <div className="bio">
        <div className="bio-info">
          { props.children }
        </div>
        <div className="bio-form">
          { bio }
          { social }
          <div className="slideFooter">
            { loading }
            { submitTime }
            <Button classes="primary sm" onClick={props.onSubmit.bind(this, slideKey)}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookBio;
