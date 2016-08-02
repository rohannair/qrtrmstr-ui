import React, { Component } from 'react';
import styles from './textBox.css';

// SubComponent
import StyleControls from './StyleControls';

import constants from './constants';
const {
  BLOCK_TYPES,
  LIST_TYPES,
  HEADER_TYPES,
  TEXT_ALIGN_TYPES,
  INLINE_STYLES
} = constants;

// Libs
import {
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  Entity,
} from 'draft-js';

// DraftJS Plugins
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';

// Components
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import Dialog from '../../components/Dialog';

class TextBox extends Component {
  constructor(props) {
    super(props);

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);

    const body = props.bodyKey ? props.body[props.bodyKey] : props.body;
    this.state = {
      showURLInput: false,
      urlValue: '',
      textAlign: props.textAlign || 'left',
      editorState: EditorState.createWithContent(stateFromHTML(body), decorator)
    };

    this.focus = () => this.refs.editor.focus();
  };

  render() {
    const { editorState, showURLInput } = this.state;
    const urlInput = showURLInput
    ? (
      <Dialog
        className="urlInputContainer"
        onClose={ () => this.setState({ showURLInput: false }) }
        onAction={ this._confirmLink }
        heading='Insert link'
      >
        <label className="formField">
          <span>Link:</span>
          <input
            ref="url"
            onChange={ this._onURLChange }
            className="urlInput"
            type="text"
            value={ this.state.urlValue }
            onKeyDown={ this._onLinkInputKeyDown }
          />
        </label>
      </Dialog>
    )
    : null;

    return (
      <div className="textBox">
        <div className="textBox-toolbar">
          <StyleControls
            editorState={ editorState }
            onToggle={ this._toggleBlockType }
            blockTypes={ HEADER_TYPES }
          />

          <StyleControls
            editorState={ editorState }
            onToggle={ this._toggleBlockType }
            blockTypes={ LIST_TYPES }
          />

          <StyleControls
            editorState={ editorState }
            onToggle={ this._toggleInlineStyle }
            blockTypes={ INLINE_STYLES }
          />

          <StyleControls
            editorState={ editorState }
            onToggle={ this._toggleBlockType }
            blockTypes={ BLOCK_TYPES }
          />

          <StyleControls
            editorState={ editorState }
            onToggle={ this._changeBlockStyle }
            blockTypes={ TEXT_ALIGN_TYPES }
          />

          <Button
            center
            onClick={ this._promptForLink }
            classes='transparent'
            icon='link'
          />

          <Button
            center
            onClick={ this._removeLink }
            classes='transparent'
            icon='chain-broken'
          />

          { urlInput }
        </div>

        <Editor
          spellCheck
          textAlignment={ this.state.textAlign }
          contentEditable
          suppressContentEditableWarning
          editorState={ editorState }
          handleKeyCommand={ this._handleKeyCommand }
          onChange={ this._onChange }
          ref="editor"
        />
      </div>
    );
  };

  _onChange = (editorState) => {
    this.setState({ editorState });
    const updatedIntro = this._outputHtml();
    if (this.props.bodyKey) return this.props.updateSlide(this.props.bodyKey, updatedIntro);
    return this.props.updateSlide('body', updatedIntro, this.props.slideNum);
  };

  _toggleBlockType = (blockType) => {
    this._onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  };

  _toggleInlineStyle = (inlineStyle) => {
    this._onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  };

  _changeBlockStyle = (block) => {
    this.setState({
      textAlign: block
    });
    if (this.props.bodyKey) return this.props.updateSlide('textAlign', block);
    return this.props.updateSlide('textAlign', block, this.props.slideNum);
  };

  _promptForLink = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        showURLInput: true,
        urlValue: '',
      });
    }
  };

  _confirmLink = (e) => {
    e.preventDefault();

    const { editorState, urlValue } = this.state;
    const url = urlValue.indexOf('//') > -1
    ? urlValue
    : '//' + urlValue;

    const entityKey = Entity.create('LINK', 'MUTABLE', { url });

    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, this.refs.editor.focus());
  };

  _onLinkInputKeyDown = (e) => e.which === 13 ? this._confirmLink(e) : '';

  _removeLink = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      }, this.refs.editor.focus());
    }
  };

  _outputHtml = () => stateToHTML(this.state.editorState.getCurrentContent()).toString();

  _handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this._onChange(newState);
      return true;
    }
    return false;
  };

  _onURLChange = (e) => this.setState({ urlValue: e.target.value });
};

function findLinkEntities(contentBlock, cb) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },

    cb
  );
}

const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData();
  return (
    <a href={url} target="_blank">
      { props.children }
    </a>
  );
};

export default TextBox;
