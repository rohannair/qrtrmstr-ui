import React from 'react';
import styles from './optionEditor.css';

import Button from '../Button';
import TextEditor from '../TextEditor';

const OptionEditor = (props) => {
  const opts = [...props.body].map((opt, i) => {
    return (
      <div className="survey-option" key={opt.id}>
        <label>{`ID: ${opt.id}`}</label>

        <label>Title:
          <input type="text" defaultValue={opt.title} />
        </label>

        <label>Image:
          <input type="text" defaultValue={opt.img} />
        </label>

        <label>Description:
          <TextEditor>{opt.desc}</TextEditor>
        </label>

      </div>
    );
  });

  return (
    <div>
      <div className="optionEditor">
        { opts }
      </div>

      <div style={{flexGrow:10}}>
        <Button classes="secondary lg">Save</Button>
      </div>
    </div>
  );
};

export default OptionEditor;
