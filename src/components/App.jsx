import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import LandingPage from './Landing';

import * as routes from '../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route
        exact
        path={routes.LANDING}
        component={LandingPage} />
      <Route
        exact
        path={routes.SIGN_UP}
        component={SignUpPage} />
      <Route
        exact
        path={routes.SIGN_IN}
        component={SignInPage} />
    </div>
  </Router>
);

export default App;