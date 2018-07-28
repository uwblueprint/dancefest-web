import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Header from './header/Header';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import LandingPage from './Landing';

import * as routes from '../constants/routes';

const App = () => (
  <Router>
    <div>
      <Header />
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
