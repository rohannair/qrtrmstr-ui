import React from 'react';
import styles from './playbookEditorBody.css';

import Card from '../Card';

const PlaybookEditorBody = ({ children }) => {
  const slideCountCopy = `${[].concat(children).length} section${[].concat(children).length > 1 ? 's' : ''}` || 0;
  return (
    <div className="playbookEditorBody playbookEditor-body">
      <div className="playbook-slideCount">{ slideCountCopy }</div>
        { children }
    </div>
  );
};

export default PlaybookEditorBody;
