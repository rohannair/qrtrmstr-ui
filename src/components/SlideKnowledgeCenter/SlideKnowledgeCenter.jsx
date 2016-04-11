import React from 'react';
import styles from './slideKnowledgeCenter.css';

const SlideKnowledgeCenter = (props) => {
  return (
    <div className="slideKnowledgeCenter">
      <pre>{ JSON.stringify(props, null, 4) }</pre>
    </div>
  );
};

export default SlideKnowledgeCenter;
