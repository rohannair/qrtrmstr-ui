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
    const { playbook, submittedDoc, users, completePlaybook } = this.props;
    let incompleteCards = {};
    let completedCards = {};
    let unsubmittableCards = {};
    let cardsDisplay = null;


    for (let val in playbook) {
      if (playbook[val].submittable === false) {
        unsubmittableCards[val] = playbook[val];
      };
    };

    for (let val in submittedDoc) {
      submittedDoc[val].submitted === true
      ? completedCards[val] = submittedDoc[val]
      : incompleteCards[val] = submittedDoc[val];
    };

    const totalCompleted = {
      ...completedCards,
      ...unsubmittableCards
    };

    if (users.first_name) {
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

    const userInfo = users ? <div className="textInfoUser">{users.first_name} {users.last_name}</div> : null;
    const playbookName = completePlaybook ? <div className="textInfoComp">{completePlaybook.name}</div> : null;
    const status = completePlaybook ? <span className="textInfoPerc">{completePlaybook.percent_submitted * 100}%</span> : null;
    const comTaskClass = this.state.selectedTab === 'completed' ? 'selected' : null;
    const incomTaskClass = this.state.selectedTab === 'incomplete' ? 'selected' : null;
    return (
      <div className="playbook">
        <Header isAdmin={true}>
          <Menu />
        </Header>
        <div className="resultsInfo">
          <div className="resultsInfoBody">
            <span className="resultsTitle">
              <div className="playbookTitle" >Playbook:</div>
              <div className="playbookInfo">{ userInfo } { playbookName }</div>
            </span>
            <span className="resultsTitle">
              <div className="playbookTitle" >Status: { status } </div>
            </span>
          </div>
        </div>
        <div className="tasksTab">
          <div onClick={this._setCompleted} className={`comTask ${comTaskClass}`}>
            COMPLETED TASKS
          </div>
          <div onClick={this._setIncomplete} className={`incomTask ${incomTaskClass}`}>
            INCOMPLETE TASKS
          </div>
        </div>
        <div className="container container-playbook">
          { cardsDisplay }
        </div>
        <Footer />
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
    submittedDoc: state.playbook.submittedPlaybook,
    playbook: state.playbook.playbook,
    completePlaybook: state.playbook.completePlaybook,
    users: state.app.users
  };
}

export default connect(select)(PlaybookResults);