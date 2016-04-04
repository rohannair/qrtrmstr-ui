import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import reset from 'normalize.css';
import icons from '../../assets/font/css/open-iconic.css';
import styles from './global.css';

const AppContainer = props => {
  return (
    <div className="app">

      <div className="app-globals">
          <Header {...props} />
          <Sidebar />
          <Footer />
      </div>

      <div className="app-body">
        <div className="container container-app">
          { props.children }
        </div>
      </div>

    </div>
  );
};

export default AppContainer;
