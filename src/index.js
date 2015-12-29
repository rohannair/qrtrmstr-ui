import React from 'react';
import ReactDom from 'react-dom';

import Survey from './containers/Survey';
import store from './store/appStore';

const App = React.createClass({

  render() {
    const fields = store.getState();

    return (
      <div>
        <Survey fields={fields.default.fields}/>
      </div>
    );
  }

});

ReactDom.render(<App />, document.getElementById('app'));
