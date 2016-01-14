import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

import reset from 'normalize.css';
import styles from './global.css';

const AppContainer = props => {
  return (
    <div className="app">
      <Header {...props} />
      <div className="app-body">
        <div className="sidebar">
          Hello
        </div>
        <div className="container container-app">
          { props.children }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppContainer;
