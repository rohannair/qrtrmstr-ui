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
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'completed'
    };
  }

  static defaultProps = {
    user: {
      firstName: '',
      lastName: '',
    },
    playbook: {}
  };

  componentWillMount() {
    const id = this.props.routeParams.playbookID || this.props.location.query.playbookId;
    this._getPlaybook(id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.playbook !== this.props.playbook) {
      this._getSingleUser(nextProps.playbook.assigned);
    };
  }

  render() {
    const { user, playbook } = this.props;
    let incompleteCards = {};
    let completedCards = {};
    let unsubmittableCards = {};
    let cardsDisplay = null;

    for (let val in playbook.doc) {
      if (playbook.doc[val].submittable === false) {
        unsubmittableCards[val] = playbook.doc[val];
      };
    };

    for (let val in playbook.submitted_doc) {
      playbook.submitted_doc[val].submitted === true
      ? completedCards[val] = playbook.submitted_doc[val]
      : incompleteCards[val] = playbook.submitted_doc[val];
    };

    const totalCompleted = {
      ...completedCards,
      ...unsubmittableCards
    };

    cardsDisplay = this.state.selectedTab === 'completed'
    ? <PlaybookResultsCards
        view={ this.state.selectedTab }
        totalCards={ totalCompleted }
        validateLink={ this._validateLink }
      />
    : <PlaybookResultsCards
        view={ this.state.selectedTab }
        totalCards={ incompleteCards }
        validateLink={ this._validateLink }
      />;

    const userInfo = user ? <div className="textInfoUser"></div> : false;
    const playbookName = playbook ? <div className="textInfoComp"></div> : false;
    const status = playbook
    ? playbook.percent_submitted * 100 + '%'
    : '';
    const comTaskClass = this.state.selectedTab === 'completed' ? 'selected' : false;
    const incomTaskClass = this.state.selectedTab === 'incomplete' ? 'selected' : false;

    return (
      <div className="playbook-results">
        <div className="playbook-results-info">
          <div className="playbook-results-single">
            <div className="title">Playbook:</div>
            <div className="info">{`${user.firstName} ${user.lastName} -  ${playbook ? playbook.name : '' }`}</div>
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

  _validateLink = (link) => link.indexOf('https://') > -1 || link.indexOf('http://') > -1 ? link : 'https://' + link;

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
    playbook: state.playbook.playbook,
    user: state.app.assignedUser
  };
}

export default connect(select)(PlaybookResults);
