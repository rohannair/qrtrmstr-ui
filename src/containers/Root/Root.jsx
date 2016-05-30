import React, { Component, PropTypes } from 'react';

import { Provider } from 'react-redux';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object,
    routes: PropTypes.object
  };

  render() {
    const {store, routes} = this.props;
    return (
      <Provider store={ store }>
        { routes }
      </Provider>
    );
  }
}
