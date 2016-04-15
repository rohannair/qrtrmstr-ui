import React, { Component } from 'react';
import styles from './textBox.css';

// Libs
import { Editor, EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

class TextBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(props.body))
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="textBox">
        <ButtonGroup>
          <Button
            center={true}
            classes='secondary'
            onClick={this._onBoldClick}
            icon='bold'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='italic'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onUnderlineClick}
            icon='underline'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='header'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='align-left'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='align-center'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='align-right'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='double-quote-serif-left'
          />

          <Button
            center={true}
            classes='secondary'
            onClick={this._onItalicClick}
            icon='list'
          />

        </ButtonGroup>
        <Editor
          contentEditable={true}
          suppressContentEditableWarning={true}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          ref="editor"
        />
        <div className="footer">
          <Button
            classes="inverse md"
            onClick={this._outputHtml}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };

  _outputHtml = () => {
    const html = stateToHTML(this.state.editorState.getCurrentContent());
    console.log(JSON.stringify(html.toString()));
  };

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  _onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  };

  _onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  };

  _handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };
};

export default TextBox;
