import React, { Component, PropTypes } from 'react';
import styles from './inputGroup.css';

import { camelCase } from 'lodash';

class InputGroup extends Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  state = {

  };

  render() {
    const opt = [...this.props.groupOption.options].map(this._renderChildren);
    return (
      <div className="inputGroup">
        {opt}
      </div>
    );
  }

  _renderChildren = val => {
    const { input } = val;
    return (
      <label key={camelCase(val.name)}>
        {val.name + ':'}
        <input
          className={!!input.value ? 'read-only' : 'input'}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value || null}
          readOnly={!!input.value}/>
      </label>
    );
  }
}

export default InputGroup;
