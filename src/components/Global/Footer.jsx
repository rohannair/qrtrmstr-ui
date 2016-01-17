import React, { Component } from 'react';
import moment from 'moment';

const Footer = props => {
  const year = moment().year();
  return (
    <footer className="app-footer">
      <p>&copy; 2016 - {year} Quartermaster <br />All rights reserved</p>
    </footer>
  );
};

export default Footer;
