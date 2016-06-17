import React, { Component } from 'react';
import styles from './textBox.css';

// Libs
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, Entity, CompositeDecorator } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';
import { ButtonToolbar, MenuItem, Dropdown } from 'react-bootstrap';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

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
      slideNum: props.slideNum,
      textAlign: props.textAlign || 'left',
      editorState: EditorState.createWithContent(stateFromHTML(body), decorator)
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
      const updatedIntro = this._outputHtml();
      if (props.bodyKey) return props.updateSlide(props.bodyKey, updatedIntro);
      return props.updateSlide('body', updatedIntro, this.state.slideNum);
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.changeBlockStyle = (block) => this._changeBlockStyle(block);
    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
  };

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _changeBlockStyle(block) {
    this.setState({
      textAlign: block
    });
    if (this.props.bodyKey) return this.props.updateSlide('textAlign', block);
    return this.props.updateSlide('textAlign', block, this.state.slideNum);
  };

  _promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        showURLInput: true,
        urlValue: '',
      });
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const {editorState, urlValue} = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, this.refs.editor.focus());
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      }, this.refs.editor.focus());
    }
  }

  render() {
    const { editorState } = this.state;
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div className="urlInputContainer">
          <input
            onChange={this.onURLChange}
            ref="url"
            className="urlInput"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <Button
            center={true}
            onClick={this.confirmLink}
            classes='secondary subList'
            icon='check-circle'>
          </Button>
        </div>;
    }
    let preventDefault = e => e.preventDefault();

    return (
      <div className="textBox">
        <ButtonGroup>
          <ButtonToolbar>
            <Dropdown id="dropdown-no-caret">
              <Dropdown.Toggle>
                <i className={'fa fa-header'} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <HeaderStyleControls
                  classes='secondary'
                  editorState={editorState}
                  onToggle={this.toggleBlockType}
                />
              </Dropdown.Menu>
            </Dropdown>
          </ButtonToolbar>

          <ButtonToolbar>
            <Dropdown id="dropdown-no-caret">
              <Dropdown.Toggle>
                <i className={'fa fa-list'} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <ListStyleControls
                  classes='secondary'
                  editorState={editorState}
                  onToggle={this.toggleBlockType}
                />
              </Dropdown.Menu>
            </Dropdown>
          </ButtonToolbar>

          <InlineStyleControls
            classes='secondary'
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />

          <BlockStyleControls
            classes='secondary'
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />

          <TextAlignStyleControls
            classes='secondary'
            editorState={editorState}
            onToggle={this.changeBlockStyle}
          />

          <Button
            center={true}
            onClick={this.promptForLink}
            classes='secondary subList'
            icon='link'>
          </Button>
          <Button
            center={true}
            onClick={this.removeLink}
            classes='secondary subList'
            icon='chain-broken'>
          </Button>
          {urlInput}

        </ButtonGroup>
        <Editor
          spellCheck={true}
          textAlignment={this.state.textAlign}
          contentEditable={true}
          suppressContentEditableWarning={true}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          ref="editor"
        />
      </div>
    );
  };

  _outputHtml = () => {
    const html = stateToHTML(this.state.editorState.getCurrentContent());
    // const htmlProc = JSON.stringify(html.toString());
    const htmlProc = html.toString();
    return htmlProc;
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

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData();
  return (
    <a href={url} style={styless.link}>
      {props.children}
    </a>
  );
};

const styless = {
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = this.props.icon ? 'secondary RichEditor-styleButton' : 'RichEditor-styleButton' ;
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
       { this.props.icon ? <Button center={true} classes='secondary subList' icon={this.props.icon}/>
        : <span className="subOptions">{this.props.label}</span> }
      </span>
    );
  }
};

const BLOCK_TYPES = [
  {label: 'Blockquote', style: 'blockquote', icon: 'quote-left'},
  {label: 'Code Block', style: 'code-block', icon: 'code'}
];

const LIST_TYPES = [
  {label: 'UL', style: 'unordered-list-item', icon: 'list-ul'},
  {label: 'OL', style: 'ordered-list-item', icon: 'list-ol'}
];

const HEADER_TYPES = [
  {label: 'P', style:  'paragraph'},
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'}
];

const TEXT_ALIGN_TYPES = [
  {label: 'align-left', style:  'left', icon: 'align-left'},
  {label: 'align-center', style: 'center', icon: 'align-center'},
  {label: 'align-right', style: 'right', icon: 'align-right'}
];

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'underline'}
];

const TextAlignStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const textAlignTypes = TEXT_ALIGN_TYPES.map((type) =>
    <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      icon={type.icon}
    />
  );

  return (
    <div classes='secondary'>
      { textAlignTypes }
    </div>
  );
};

const ListStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const listTypes = LIST_TYPES.map((type) =>
    <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      icon={type.icon}
    />
  );

  return (
    <div classes='secondary'>
      { listTypes }
    </div>
  );
};

const HeaderStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const headerTypes = HEADER_TYPES.map((type) =>
    <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
    />
  );

  return (
    <div classes='secondary'>
      { headerTypes }
    </div>
  );
};

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const blockTypes = BLOCK_TYPES.map((type) =>
    <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      icon={type.icon}
    />
  );

  return (
    <div classes='secondary'>
      { blockTypes }
    </div>
  );
};

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();

  const inlineTypes = INLINE_STYLES.map(type =>
    <StyleButton
      key={type.label}
      active={currentStyle.has(type.style)}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      icon={type.icon}
    />
  );

  return (
    <div classes='secondary'>
      { inlineTypes }
    </div>
  );
};

export default TextBox;
