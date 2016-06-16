// Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';

// Components
import Footer from '../../components/Global/Footer';
import Header from '../../components/Global/Header';
import Menu from '../../components/Global/Menu';
import PlaybookResultsCards from '../../components/PlaybookResultsCards';
import Card from '../../components/Card';
import { getPlaybook } from '../../actions/playbookActions';
import { getSingleUser } from '../../actions/userActions';
import styles from './playbookResults.css';

class PlaybookResults extends Component {

  state = {
    selectedTab: 'completed'
  };

  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.completePlaybook !== this.props.completePlaybook) {
      this._getSingleUser(nextProps.completePlaybook.assigned);
    };
  }

  render() {
    const { users, completePlaybook } = this.props;
    let incompleteCards = {};
    let completedCards = {};
    let unsubmittableCards = {};
    let cardsDisplay = null;

    for (let val in completePlaybook.doc) {
      if (completePlaybook.doc[val].submittable === false) {
        unsubmittableCards[val] = completePlaybook.doc[val];
      };
    };

    for (let val in completePlaybook.submitted_doc) {
      completePlaybook.submitted_doc[val].submitted === true
      ? completedCards[val] = completePlaybook.submitted_doc[val]
      : incompleteCards[val] = completePlaybook.submitted_doc[val];
    };

    const totalCompleted = {
      ...completedCards,
      ...unsubmittableCards
    };

    if (users.firstName) {
      cardsDisplay = this.state.selectedTab === 'completed'
      ? <PlaybookResultsCards
          userInfo={ users }
          view={ this.state.selectedTab }
          totalCards={ totalCompleted }
        />
      : <PlaybookResultsCards
          userInfo={ users }
          view={ this.state.selectedTab }
          totalCards={ incompleteCards }
        />;
    }

    const userInfo = users ? <div className="textInfoUser"></div> : null;
    const playbookName = completePlaybook ? <div className="textInfoComp"></div> : null;
    const status = completePlaybook
    ? completePlaybook.percent_submitted * 100 + '%'
    : '';
    const comTaskClass = this.state.selectedTab === 'completed' ? 'selected' : null;
    const incomTaskClass = this.state.selectedTab === 'incomplete' ? 'selected' : null;

    return (
      <div className="playbook-results">
        <div className="playbook-results-info">
          <div className="playbook-results-single">
            <div className="title">Playbook:</div>
            <div className="info">{`${users.firstName} ${users.lastName} -  ${completePlaybook ? completePlaybook.name : '' }`}</div>
          </div>
          <div className="playbook-results-single">
            <div className="title">Status: </div>
            <div className="info">{ `${status} Completed` }</div>
          </div>
        </div>

        <div className="tasksTab">
          <div onClick={this._setCompleted} className={`comTask ${comTaskClass}`}>
            Complete Tasks
          </div>
          <div onClick={this._setIncomplete} className={`incomTask ${incomTaskClass}`}>
            Incomplete Tasks
          </div>
        </div>

        { cardsDisplay }

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

  _getSingleUser = id => {
    const { token, dispatch } = this.props;
    if (token) {
      return dispatch(getSingleUser(token, id));
    }
    return dispatch(getSingleUser(null, id));
  };

  _setCompleted = () => {
    this.setState({
      selectedTab: 'completed'
    });
  };

  _setIncomplete = () => {
    this.setState({
      selectedTab: 'incomplete'
    });
  };

};

function select(state) {
  const token = state.accountActions.token || Cookies.get('token');
  return {
    token,
    completePlaybook: state.playbook.completePlaybook,
    users: state.app.users
  };
}

export default connect(select)(PlaybookResults);
