import React from 'react';
import styles from './navGrid.css';

const NavGrid = (props) => {

  const { opts } = props;
  let uri = '#';

  const items = [...opts].map(opt => {
    const { name, uri, icon, id } = opt;

    return (
      <a href={ uri } key={ id } onClick={ props.onClick }>
        <i className="oi" data-glyph={ icon } />
        { name }
      </a>
    );
  });

  return (
    <div className="navGrid">
      { items }
    </div>
  );
};

export default NavGrid;
