// Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';

// Components
import Footer from '../../components/Global/Footer';
import Header from '../../components/Global/Header';
import PlaybookCards from '../../components/PlaybookCards';
import Card from '../../components/Card';
import { getPlaybook } from '../../actions/playbookActions';
import styles from './playbookResults.css';



class PlaybookResults extends Component {

  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
  }

  render() {
    const cards = Object.keys(this.props.submittedDoc).map((val) => {

      let field = this.props.submittedDoc[val];

      switch (field.type) {
      case 'bio':
        return (
          <Card key={ field.slide_number } footer={<div/>}>
            <h2>{field.body.heading}</h2>
            <div>
              <div className="profileImage">
                <img src={ field.body.options.profile_image.url } />
              </div>
              <div className="profileDesc">
                { field.body.options.bio }
              </div>
            </div>
          </Card>
        );

      case 'equipment':
        const opts = field.body.options.map((val, ind) => {

          return (
            <div key={val.id} className="equipment-choice">
              <span>{val.name + ': ' + field.body.options[ind].optNames }</span>
            </div>
          );
        });

        return (
          <Card key={field.slide_number} footer={<div/>}>
            <h2>{field.heading}</h2>
            <div className="equipment-form">
              { opts }
            </div>
          </Card>
        );

      default:
        return null;
      }

    });

    return (
      <div className="container container-playbook">
        { cards }
      </div>
    );
  };

  _getPlaybook = id => {
    const { token, dispatch } = this.props;
    if (token) {
      return dispatch(getPlaybook(token, id));
    }
    return dispatch(getPlaybook(null, id));
  };
};

function select(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    submittedDoc: state.playbook.submittedPlaybook,
  };
}

export default connect(select)(PlaybookResults);
