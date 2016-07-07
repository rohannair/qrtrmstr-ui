import React, { Component } from 'react';
import { Link } from 'react-router';
import Cookies from 'cookies-js';

const Header = props => {

  const token = Cookies.get('token');

  const headerLink = token
  ? <Link to="/dashboard">Quartermaster</Link>
  : <a href="#">Quartermaster</a>;

  const logoutLink = token
  ? <Link to="/logout" className="right">Log Out</Link>
  : null;

  return (
    <header className="appHeader">
      <div className="appHeader-section">
        <div className="appHeader-item appHeader-logo">
          { headerLink }
        </div>
        <div className="appHeader-item">
          { props.children }
        </div>
      </div>
      <div className="appHeader-section">
        { logoutLink }
      </div>
    </header>
  );
};

export default Header;
