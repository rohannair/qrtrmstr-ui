// Deps
import React, { Component } from 'react';
import { find, findIndex } from 'lodash';

// CSS
import styles from './slideEquipment.css';

// SubComponents
import SlideEquipmentHeader from '../SlideEquipmentHeader';
import SlideEquipmentBody from '../SlideEquipmentBody';

class SlideEquipment extends Component {
  state = {
    options: this.props.body.options || [],
    selected: null
  };

  render() {
    const names = this.state.options.map( val => ({ id: val.id, name: val.name }));

    const selected = this.state.selected
      ? this.state.options
        .filter(val => val.id === this.state.selected)
      : this.state.options;

    return (
      <div className="slideEquipment">
        <div className="slide-input">
          <strong>Heading:</strong> <input defaultValue={this.props.heading} />
          <strong>Description:</strong><input defaultValue={this.props.body.desc} /></div>

        <SlideEquipmentHeader
          vals={ names }
          onClick={ this._setSelected }
          onNew={ this._newOption }
          onEdit= { this._editOption }
          onRemove={ this._removeOption }
          selected={ selected[0].id }
        />

        <SlideEquipmentBody
          opt={ selected }
          newOption={ this._newSubOption }
          deleteOption={ this._removeSubOption }
        />
      </div>
    );
  };

  _setSelected = (key) => {
    this.setState({
      selected: key
    })
  };

  _newOption = () => {
    const newOptions = { name: 'New' };
    const options = this.state.options;

    this.setState({
      options:  [
        ...options,
        newOptions
      ]
    })
  };

  _editOption = (key, newName) => {
    const { options } = this.state;

    const opt = find(options, (o) => o.id === key);
    const optIndex = findIndex(options, (o) => o.id === key);

    const newOption = {
      ...opt,
      name: newName
    };

    const newOptions = [
      ...options.slice(0, optIndex),
      newOption,
      ...options.slice(optIndex + 1)
    ];

    this.setState({
      options: newOptions
    });
  };

  _removeOption = (key) => {
    const options = [...this.state.options]
    .filter(val => {
      return val.id !== key;
    });

    this.setState({
      options
    })

    if (this.state.selected === key) {
      this.setState({
        selected: null
      })
    }
  };

  _removeSubOption = (ind, key) => {
    const { options } = this.state;
    let selectedIdIndex = 0;
    let selectedKeyIndex = 0;

    const optToChange = options.reduce((prev, val, i) => {
      let mergeable = null;
      if (val.id === ind) {
        selectedIdIndex = i;
        mergeable = val;
      }

      return { ...prev, ...mergeable }
    });

    const opts = [...optToChange.opts].filter((val, i) => {
      if (val === key) {
        selectedKeyIndex = i;
        return null;
      }
      return val;
    });

    const optNames = [...optToChange.optNames].filter((val, i) => i !== selectedKeyIndex);

    let newOpt = {
      ...optToChange,
      opts,
      optNames
    };

    this.setState({
      options: [
      ...options.slice(0, selectedIdIndex),
      newOpt,
      ...options.slice(selectedIdIndex + 1),
      ]
    });
  };

  _newSubOption = (ind) => {
    const { options } = this.state;
    let selectedIndex = 0;

    const optToChange = options.reduce((prev, val, i) => {
      let mergeable = null;
      if (val.id === ind) {
        selectedIndex = i;
        mergeable = val;
      }

      return { ...prev, ...mergeable }
    });

    const optNames = [
    ...optToChange.optNames,
    'New Option'
    ];

    const opts = [
    ...optToChange.opts,
    `opt-${Math.random()}`
    ];

    const newOpt = {
      ...optToChange,
      optNames,
      opts
    };

    this.setState({
      options: [
      ...options.slice(0, selectedIndex),
      newOpt,
      ...options.slice(selectedIndex + 1),
      ]
    })
  };
};

export default SlideEquipment;


