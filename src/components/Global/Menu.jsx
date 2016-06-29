import React, { Component } from 'react';
import { Link } from 'react-router';

const Menu = props => {
  return (
    <div className="header-menu">
      <Link to="/admin/playbooks" activeClassName="active">Playbooks</Link>
      <Link to="/admin/users" activeClassName="active">Users</Link>
      <Link to="/admin/emails" activeClassName="active">Emails</Link>
    </div>
  );
};

export default Menu;
