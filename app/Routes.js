/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import QueryPage from './containers/QueryPage';
import AboutPage from './containers/AboutPage';

export default () => (
  <App>    
    <Switch>
      <Route path={routes.QUERY} component={QueryPage} />      
      <Route path={routes.ABOUT} component={AboutPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
