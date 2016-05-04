// Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import styles from './playbook.css';

// Components
import Footer from '../../components/Global/Footer';
import Header from '../../components/Global/Header';
import PlaybookCards from '../../components/PlaybookCards';

// Actions
import { setSelection, submitPlaybook, getPlaybook } from '../../actions/playbookActions';

class Playbook extends Component {
  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
  };

  render() {
    const { id, fields, selected } = this.props;

    return (
      <div className="playbook">
        <Header />
        <PlaybookCards
          fields={ fields }
          onClick={ this._onClick }
          onSubmit={ this._onSubmit }
          selected={ selected }
        />
        <Footer />
      </div>
    );
  };

  _onClick = (id) => {
    return this.props.dispatch(setSelection(id));
  };

  _onSubmit = () => {
    const { selected } = this.props;
    return this.props.dispatch(submitPlaybook(selected));
  };

  _getPlaybook = id => {
    const { token, dispatch } = this.props;
    return dispatch(getPlaybook(token, id));
  };

};

function select(state) {
  return {
    id: state.playbook.id,
    fields: state.playbook.playbook,
    selected: state.playbook.selected
  };
}

export default connect(select)(Playbook);
