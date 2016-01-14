import React, { Component } from 'react';

const Header = props => {
  return (
    <header className="app-header">
      <span className="logo">Quartermaster</span>
      <button className="logout" onClick={props.logout}>Log out</button>
    </header>
  );
};

export default Header;
