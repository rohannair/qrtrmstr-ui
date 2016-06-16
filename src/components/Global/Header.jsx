import React, { Component } from 'react';
import { Link } from 'react-router';

const Header = props => {
  const headerLink =  props.isAdmin  ?  <Link to="/dashboard"> Quartermaster</Link> : <a href="#"> Quartermaster</a>

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
        <Link to="/logout" className="right">Log Out</Link>
      </div>
    </header>
  );
};

export default Header;
