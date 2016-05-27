import React from 'react';
import { IndexRoute, Route } from 'react-router';

// Components
import App from '../containers/App';
import Home from '../components/Home';
import Login from '../containers/Auth/Login';
import Playbook from '../containers/Playbook';

import NotFound from '../components/NotFound';
import PlaybookList from '../containers/PlaybookList';
import PlaybookEditor from '../containers/PlaybookEditor';
import UserList from '../containers/UserList';

// Utils
import { hasToken, requireAuth, checkAuth } from '../utils/auth';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } onEnter={ requireAuth } />
    <Route path="dashboard" component={ Home } onEnter={ requireAuth }>
      <IndexRoute component={ UserList } />
      <Route path="playbooks" component={ PlaybookList } />
      <Route path="playbooks/edit/:playbookID" component={ PlaybookEditor } />
      <Route path="users" component={ UserList } />
      <Route path="*" component={ NotFound } />
    </Route>
    <Route path="login" component={ Login } onEnter={ checkAuth } />
    <Route path="logout" component={ Login } />
    <Route path="playbook/:playbookID" component={ Playbook } />
    <Route path="*" component={ NotFound } />
  </Route>
);

export default routes;
