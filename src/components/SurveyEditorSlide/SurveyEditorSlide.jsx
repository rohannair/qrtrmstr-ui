import React from 'react';
import styles from './surveyEditorSlide.css';

import Card from '../Card';
import TextEditor from '../TextEditor';
import OptionEditor from '../OptionEditor';

const SurveyEditorSlide = (props) => {
  const bodyClasses = 'slide-body ' + (props.isOpen ? 'open' : '');

  const editField = props.type === 'text'
    ? (<TextEditor>{props.body}</TextEditor>)
    : <OptionEditor body={props.body} />;

  const heading = (
    <h3 className="slide-heading" id={props.id} onClick={props.onClick}>
      <span className="counter">{props.count}</span>
      {props.heading}
      <div className="group">
        <i className="oi" data-glyph="move" />
        <i className="oi" data-glyph="trash" />
      </div>
    </h3>
  );

  return (
    <Card noPadding={true}>
      <div className="editSurvey-slide surveyEditorSlide" >
        {heading}
        <div className={bodyClasses}>
          <label>Body:
            { editField }
          </label>
        </div>
      </div>
    </Card>
  );
};

export default SurveyEditorSlide;
