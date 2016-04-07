// Deps
import React, { Component } from 'react';

// CSS
import styles from './slideEquipmentHeader.css';

// SubComponents
import Button from '../Button';

class SlideEquipmentHeader extends Component {
  state = {
    editing: false
  };

  render () {
    const { vals, onClick, onNew, selected, onRemove, onEdit } = this.props;
    const { editing } = this.state;

    const self = this;
    const opts = vals.map(val => {
      return val.id === editing
       ? <Editing
          key={ val.id }
          onClick={ onClick }
          onSave={ self._onSave }
          onRemove={ onRemove }
          val={val }
          selected={ selected }
        />

       : <Regular
          key={ val.id }
          onClick={ onClick }
          onEdit={ self._onEdit.bind(this, val.id) }
          onRemove={ onRemove }
          val={val }
          selected={ selected }
        />;
    });

    return (
      <div className="slideEquipmentHeader">
        {opts}
        <div className="tab newTab" onClick={ onNew }>+</div>
      </div>
    );
  };

  _onEdit = (id) => {
    this.setState({
      editing: id
    })
  };

  _onSave = (id, newName) => {
    this.setState({
      editing: false
    });

    return this.props.onEdit(id, newName);
  }
}

export default SlideEquipmentHeader;


// SubComponents
class Editing extends Component {
  state = {
    val: this.props.val.name || null
  }

  render () {
    const { val, onClick, onSave, onRemove, selected } = this.props;
    const classes = val.id === selected ? 'tab active' : 'tab';

    return (
      <div className={ classes }>
        <div className="tabText " onClick={ onClick.bind(this, val.id) }>
          <input defaultValue={ val.name } value={ this.state.val } onChange={ this._onChangeName } />
        </div>
        <div className="actionButtons">
          <Button classes="editBtn transparent xs" onClick={ onSave.bind(this, val.id, this.state.val) } icon="check" />
          <Button classes="removeBtn transparent xs" onClick={ onRemove.bind(this, val.id) } icon="x" />
        </div>
      </div>
    );
  };

  _onChangeName = (e) => {
    this.setState( {
      val: e.target.value
    });
  }
};


const Regular = ({ val, onClick, onEdit, onRemove, selected }) => {
  const classes = val.id === selected ? 'tab active' : 'tab';

  return (
    <div className={ classes }>
      <div className="tabText " onClick={ onClick.bind(this, val.id) }>{ val.name }</div>
      <div className="actionButtons">
        <Button classes="editBtn transparent xs" onClick={ onEdit.bind(this, val.id) } icon="pencil" />
        <Button classes="removeBtn transparent xs" onClick={ onRemove.bind(this, val.id) } icon="x" />
      </div>
    </div>
  );
};
