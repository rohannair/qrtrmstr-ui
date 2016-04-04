import React, { Component } from 'react';
import { Link } from 'react-router';
const Header = props => {
  // <button className="logout" onClick={props.logout}>Log out</button>
  return (
    <header className="app-header">
      <Link to="/dashboard"><span className="logo">Quartermaster</span></Link>
    </header>
  );
};

export default Header;
