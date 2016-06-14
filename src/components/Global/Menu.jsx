import React, { Component } from 'react';
import { Link } from 'react-router';

const Menu = props => {
  return (
    <div className="header-menu">
      <Link to="/dashboard/playbooks">Playbooks</Link>
      <Link to="/dashboard/users">Users</Link>

    </div>
  );
};

export default Menu;
