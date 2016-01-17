import React, { Component } from 'react';

const Header = props => {
  // <button className="logout" onClick={props.logout}>Log out</button>
  return (
    <header className="app-header">
      <span className="logo">QRTRMSTR</span>
    </header>
  );
};

export default Header;
