import React, { Component } from 'react';
import styles from './slideIntro.css';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import Card from '../../components/Card';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';

class SlideIntro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(props.body))
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  };

  render() {
    const { heading, body, slide_number, id } = this.props;
    const { editorState } = this.state;

    return (
      <Card key={id}>
        <div className="slideIntro">
          <h2>{ heading }</h2>
          <div>
            <ButtonGroup>
              <Button
                center={true}
                classes='inverse'
                onClick={this._onBoldClick}
                icon='bold'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onItalicClick}
                icon='italic'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onUnderlineClick}
                icon='underline'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onItalicClick}
                icon='header'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onItalicClick}
                icon='align-left'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onItalicClick}
                icon='align-center'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onItalicClick}
                icon='align-right'
              />

              <Button
                center={true}
                classes='inverse'
                onClick={this._onItalicClick}
                icon='double-quote-serif-left'
              />

              <Button
                center={true}
                classes='inverse'
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
          </div>
        </div>
      </Card>
    );
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

export default SlideIntro;

// <div dangerouslySetInnerHTML={{ __html: body }} />
