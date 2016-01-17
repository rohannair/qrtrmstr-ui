import React, { Component } from 'react';

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
        <li><i className="oi" data-glyph="people" /> Departments</li>
        <li><i className="oi" data-glyph="box" /> Packages</li>
        <li><i className="oi" data-glyph="monitor" /> Products</li>
        <li><i className="oi" data-glyph="document" /> Resources</li>
        <li><i className="oi" data-glyph="project" /> Surveys</li>
        <li><i className="oi" data-glyph="person" /> Users</li>
        <li><i className="oi" data-glyph="video" /> Videos</li>
      </ul>
    </div>
  );
};

export default Sidebar;
