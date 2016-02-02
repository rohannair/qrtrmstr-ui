import React from 'react';
import styles from './surveyEditorBody.css';

import TextEditor from '../TextEditor';

const SurveyEditorBody = (props) => {
  return (
    <div className="surveyEditorBody editSurvey-body">
      { returnSurvey(props.survey, props.onClick, props.openItems) }
    </div>
  );
};

export default SurveyEditorBody;

function returnSurvey(survey, clickHandler, openItems) {
  return survey.map((val, i) => {
    const bodyClasses = 'slide-body ' + (openItems.indexOf(val.id) > -1 ? 'open' : '');
    const editField = !val.form
      ? (<TextEditor>{val.body}</TextEditor>)
      : <div>{
          val.contents.options.map(val => {
            return (
              <div className="survey-option" key={val.id}>
                <label>{`ID: ${val.id}`}</label>

                <label>Image:
                  <input type="text" defaultValue={val.imageUri} />
                </label>

                <label>Title:
                  <input type="text" defaultValue={val.title} />
                </label>

                <label>Description:
                  <TextEditor>{val.body}</TextEditor>
                </label>
              </div>
            );
          })
        }
      </div>;


    return (
      <div key={val.id} className="editSurvey-slide">
        <h3 className="slide-heading" onClick={clickHandler} id={val.id}>
          <span className="counter">{i + 1}</span>
          {val.heading}
          <div className="group">
            <i className="oi" data-glyph="move" />
            <i className="oi" data-glyph="trash" />
          </div>
        </h3>
        <div className={bodyClasses}>
          <label>Body:
            { editField }
          </label>
        </div>
      </div>
      );
  });
}

function isOpen(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === id) {
      return true;
    }
    return false;
  }
}
