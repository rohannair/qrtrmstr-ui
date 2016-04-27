import React from 'react';
import { IndexRoute, Route } from 'react-router';

// Components
import App from '../containers/App';
import Home from '../components/Home';
import Login from '../containers/Auth/Login';
import Survey from '../containers/Survey';

import NotFound from '../components/NotFound';
import SurveyView from '../containers/SurveyView';
import SurveyEditor from '../containers/SurveyEditor';
import UserList from '../containers/UserList';

// Utils
import { hasToken, requireAuth, checkAuth } from '../utils/auth';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } onEnter={ requireAuth } />
    <Route path="dashboard" component={ Home } onEnter={ requireAuth }>
      <IndexRoute component={ UserList } />
      <Route path="surveys" component={ SurveyView } />
      <Route path="surveys/edit/:surveyID" component={ SurveyEditor } />
      <Route path="users" component={ UserList } />
      <Route path="*" component={ NotFound } />
    </Route>
    <Route path="login" component={ Login } onEnter={ checkAuth } />
    <Route path="logout" component={ Login } />
    <Route path="survey/:surveyID" component={ Survey } />
    <Route path="*" component={ NotFound } />
  </Route>
);

export default routes;
