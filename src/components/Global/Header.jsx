import React, { Component } from 'react';
import { Link } from 'react-router';

const Header = props => {
  return (
    <header className="appHeader">
      <div className="appHeader-section">
        <div className="appHeader-item appHeader-logo">
          <Link to="/dashboard">
            Quartermaster
          </Link>
        </div>
        <div className="appHeader-item">
          { props.children }
        </div>
      </div>
      <div className="appHeader-section"></div>
    </header>
  );
};

export default Header;
