import React, { Component } from 'react';
import PlaybookResultsCards from '../PlaybookResultsCards';

const PlaybookResultsView = (props) => {

  return (
    <div className="PlaybookResultsCompleted">
      <PlaybookResultsCards {...props} />
    </div>
  );

};

export default PlaybookResultsView;
