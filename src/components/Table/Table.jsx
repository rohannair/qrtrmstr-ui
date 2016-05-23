import React from 'react';
import styles from './table.css';
import { capitalize } from 'lodash';

const Table = (props) => {
  const headerCells = props.headings
  ? props.headings.map(val => {
    if (val === 'check') {
      return (
        <div key={val} className={`cell cell-heading ${val}`}>
          <input type="checkbox" disabled />
        </div>
      )
    }

    return (
      <div key={val} className={`cell cell-heading ${val}`}>
        { capitalize(val) }
      </div>
      )
    })
  : null;

  return (
    <div className="table">
      <div className="table-header">
        { headerCells }
      </div>
      <div className="table-body">
        { props.children }
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Table;
