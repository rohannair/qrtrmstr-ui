import React from 'react';
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Components
import App from '../containers/App';
import Home from '../components/Home';
import Login from '../containers/Auth/Login';
import Playbook from '../containers/Playbook';

import NotFound from '../components/NotFound';
import PlaybookList from '../containers/PlaybookList';
import PlaybookEditor from '../containers/PlaybookEditor';
import PlaybookResults from '../containers/PlaybookResults';
import UserList from '../containers/UserList';

// Utils
import { hasToken, requireAuth, checkAuth } from '../utils/auth';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={ browserHistory } >
      <Route path="/" component={ App }>
        <IndexRedirect to="/dashboard" />
        <Route path="dashboard" component={ Home } onEnter={ requireAuth }>
          <IndexRoute component={ UserList } />
          <Route path="playbooks" component={ PlaybookList } />
          <Route path="playbooks/edit/:playbookID" component={ PlaybookEditor } />
          <Route path="playbooks/results/:playbookID" component={ PlaybookResults } />
          <Route path="users" component={ UserList } />
          <Route path="*" component={ NotFound } />
        </Route>
        <Route path="login" component={ Login } onEnter={ checkAuth } />
        <Route path="logout" component={ Login } />
        <Route path="playbook/:playbookID" component={ Playbook } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>
  );
};
