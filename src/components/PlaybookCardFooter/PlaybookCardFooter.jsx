import React from 'react';
import styles from './playbookCardFooter.css';

import Button from '../../components/Button';

const PlaybookCardFooter = (props) => {
  return (
    <div className="nextButton">
      <Button classes={'lgLong primary'}>Next</Button>
    </div>
  );
};

export default PlaybookCardFooter;
