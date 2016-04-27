// Deps
import React, { Component } from 'react';
import { find, findIndex } from 'lodash';

// CSS
import styles from './slideEquipment.css';

// SubComponents
import SlideEquipmentHeader from '../SlideEquipmentHeader';
import SlideEquipmentBody from '../SlideEquipmentBody';
import { updateSurveyState } from '../../actions/surveyViewActions';


class SlideEquipment extends Component {
  state = {
    options: this.props.body.options || [],
    selected: null
  };

  render() {
    const { options } = this.state;

    const names = options.map( val => ({ id: val.id, name: val.name }));

    const selected = this.state.selected
      ? (options
        .filter(val => val.id === this.state.selected))[0]
      : this.state.options[0];

    return (
      <div className="slideEquipment">
        <div className="slide-input">
          <strong>Heading:</strong>
          <input
            name="heading"
            value={this.props.heading}
            onChange={ e => this._updateEquipmentState(e.target.name, e.target.value) }
          />
          <strong>Description:</strong>
          <input
            name="desc"
            value={this.props.body.desc}
            onChange={ e => this._updateEquipmentState(e.target.name, e.target.value) }
          />
        </div>

        <SlideEquipmentHeader
          vals={ names }
          onClick={ this._setSelected }
          onNew={ this._newOption }
          onEdit={ this._editOption }
          onRemove={ this._removeOption }
          selected={ selected.id }
        />

        <SlideEquipmentBody
          opt={ selected }
          // selectedId={ options.indexOf(selected) }
          newOption={ this._newSubOption }
          editOption={ this._editSubOption }
          deleteOption={ this._removeSubOption }
          save={this._saveAll}
        />
      </div>
    );
  };

  _updateEquipmentState = (key, value) => {
    const { dispatch, body, slide_number } = this.props;
    const updatedSlide = Object.keys(this.props).indexOf(key) > -1
    ? {[key]: value}
    : {body: {
        ...body,
        [key]: value}
      };
    console.log(updatedSlide);
    return dispatch(updateSurveyState(slide_number, updatedSlide));
  };

  _setSelected = (key) => {
    this.setState({
      selected: key
    });
  };

  _newOption = () => {
    const newOptions = { name: 'New' };
    const options = this.state.options;

    this.setState({
      options:  [
        ...options,
        newOptions
      ]
    });
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
    this._updateEquipmentState("options", newOptions);
  };

  _removeOption = (key) => {
    const options = [...this.state.options]
    .filter(val => {
      return val.id !== key;
    });

    this.setState({
      options
    });

    this._updateEquipmentState("options", options);

    if (this.state.selected === key) {
      this.setState({
        selected: null
      });
    }
  };

  _editSubOption = (key, value, ind) => {
    const { options } = this.state;
    const selected = this.state.selected
      ? (options
        .filter(val => val.id === this.state.selected))[0]
      : this.state.options[0];
    const pos = options.indexOf(selected);
    const newOption = {
      ...selected,
      [key]: [
        ...selected[key].slice(0, ind),
        value,
        ...selected[key].slice(ind + 1)
      ]
    };

    const newOptions = [
      ...options.slice(0, pos),
      newOption,
      ...options.slice(pos + 1)
    ];

    this.setState({
      options: newOptions
    });
    this._updateEquipmentState("options", newOptions);
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

      return { ...prev, ...mergeable };
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

    const newRemOpt = [
      ...options.slice(0, selectedIdIndex),
      newOpt,
      ...options.slice(selectedIdIndex + 1),
    ];

    this.setState({
      options: newRemOpt
    });

    this._updateEquipmentState("options", newRemOpt);

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

      return { ...prev, ...mergeable };
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

    const newAddOption = [
      ...options.slice(0, selectedIndex),
      newOpt,
      ...options.slice(selectedIndex + 1),
    ];

    this.setState({
      options: newAddOption
    });

    this._updateEquipmentState("options", newAddOption);
  };

  _saveAll = () => {
    return this.props.saveSlide(this.state, this.props.slide_number);
  };
};

export default SlideEquipment;


