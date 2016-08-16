import React, { Component } from 'react';
import styles from './playbookBio.css';
import Button from '../Button';

import Uploader from '../../containers/Uploader';

const PlaybookBio = (props) => {
  const { options } = props.body;
  const { slideKey } = props.findSlideKey(props.slide_number);

  const currentBio = props.submittedDoc
  ? props.submittedDoc[slideKey].body.options.bio
  : '';

  const profilePic = options.profile_image
  ? (
      <Uploader>
        <i className="material-icons">cloud_upload</i>
        <span>Upload a profile picture</span>
      </Uploader>
    )
  : null;

  const bio = options.bio
  ? (
      <textarea
        value={ currentBio }
        name='bio'
        onChange={ e => props.onChange(props.slide_number, e.target.name, e.target.value) }
      />
    )
  : null;

  const fbCurrVal = props.submittedDoc
  ? props.submittedDoc[slideKey].body.options.facebook
  : '';

  const facebook = options.facebook
  ? (
      <div className="socMedia">
        <div className="iconBox fb">
          <i className="fa fa-facebook"></i>
        </div>
        <input value={ fbCurrVal }
          name='facebook'
          onChange={ e => props.onChange(props.slide_number, e.target.name, e.target.value) } />
      </div>
    )
  : null;

  const twCurrVal = props.submittedDoc
  ? props.submittedDoc[slideKey].body.options.twitter
  : '';

  const twitter = options.twitter
  ? (
      <div className="socMedia">
        <div className="iconBox tw">
          <i className="fa fa-twitter"></i>
        </div>
        <input value={ twCurrVal }
          name='twitter'
          onChange={ e => props.onChange(props.slide_number, e.target.name, e.target.value) } />
      </div>
    )
  : null;

  const lnCurrVal = props.submittedDoc
  ? props.submittedDoc[slideKey].body.options.linkedin
  : '';

  const linkedin = options.linkedin
  ? (
      <div className="socMedia">
        <div className="iconBox li">
          <i className="fa fa-linkedin"></i>
        </div>
        <input value={ lnCurrVal }
          name='linkedin'
          onChange={ e => props.onChange(props.slide_number, e.target.name, e.target.value) } />
      </div>
    )
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
      <h2>{ props.body.heading }</h2>
      <div className="bio">
        <div className="bio-info">
          { props.children }
        </div>
        <div className="bio-form">
          { bio }
          { social }
          <div className="slideFooter">
            <Button classes="primary sm" onClick={ props.onSubmit }>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookBio;
