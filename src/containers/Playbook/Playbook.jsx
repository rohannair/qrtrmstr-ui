// Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';
import jwtDecode from 'jwt-decode';

// Styles
import styles from './playbook.css';

// Components
import Footer from '../../components/Global/Footer';
import Header from '../../components/Global/Header';
import PlaybookCards from '../../components/PlaybookCards';

// Containers
import Uploader from '../Uploader';

// Actions
import { setSelection, submitPlaybook, getPlaybook } from '../../actions/playbookActions';

class Playbook extends Component {

  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
  };

  render() {
    const { id, fields, selected, token } = this.props;
    const PlaybookUploader = (<Uploader updateState={(url) => console.log(url)} ><i className="material-icons">cloud_upload</i></Uploader>);

    return (
      <div className="playbook">
        <Header isAdmin={jwtDecode(token).isAdmin} />
        <PlaybookCards
          fields={ fields }
          onClick={ this._onClick }
          onSubmit={ this._onSubmit }
          selected={ selected }
          uploader={ PlaybookUploader }
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
  const token = state.accountActions.token || Cookies.get('token');
  return {
    id: state.playbook.id,
    token,
    fields: state.playbook.playbook,
    selected: state.playbook.selected
  };
}

export default connect(select)(Playbook);
