import React, { Component } from 'react';
import { Link } from 'react-router';

const Sidebar = props => {
  return (
    <ul className="sidebar-menu">
      <Link to="/dashboard/surveys">
        <li><i className="oi" data-glyph="project" /> Surveys</li>
      </Link>
      <Link to="/dashboard/users">
        <li><i className="oi" data-glyph="person" /> Users</li>
      </Link>
    </ul>
  );
};

export default Sidebar;
