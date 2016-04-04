import React, { Component } from 'react';
import { Link } from 'react-router';

const Sidebar = props => {
  return (
    <div className="app-sidebar">
      <div className="sidebar-copy">
        <p className="lede">Welcome to your Quartermaster.</p>
        <p>Mission documents, team bios, equipment procurement and training can all be found here.</p>
        <p>Look out for goodies such as conference tickets, stickers, t-shirts, and gift cards that are unlocked when you accomplish side missions.</p>
        <p className="align-right"><button className="sidebar-button_link">Got it</button></p>
      </div>

      <ul className="sidebar-menu">
        <Link to="/dashboard/surveys">
          <li><i className="oi" data-glyph="project" /> Surveys</li>
        </Link>
        <Link to="/dashboard/users">
          <li><i className="oi" data-glyph="person" /> Users</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
