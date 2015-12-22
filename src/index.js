import React from 'react';
import ReactDom from 'react-dom';

import Survey from './containers/Survey/Survey';

const App = React.createClass({

  render() {
    return (
      <div>
        <Survey />
      </div>
    );
  }

});

ReactDom.render(<App />, document.getElementById('app'));
