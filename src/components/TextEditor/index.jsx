import React, { Component, PropTypes } from 'react';
import ReactQuill, { Toolbar } from 'react-quill';

const Editor = require('react-medium-editor');
// load theme styles with webpack
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');


import styles from './texteditor.css';

const TextEditor = props => {
  return (
    <Editor
      text={props.children}
      options={
        {
          toolbar: {
            buttons: ['bold', 'italic', 'underline', 'anchor']
          }
        }
      }
    />
  );
};

export default TextEditor;