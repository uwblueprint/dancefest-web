import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';

// import Navigation from './Navigation';
import Header from './header/Header';
import SignInPage from './SignIn';
import Landing from './Landing';
import Home from './Home';

import * as routes from '../constants/routes';

const palette = createPalette({
  primary: {
    main: '#de2706'
  },
  secondary: {
    main: '#f5f5f5'
  }
});

const typography = createTypography(palette, {
  fontFamily: "'Raleway', sans-serif",
  headline: {
    fontFamily: "'Fjalla One', sans-serif",
    fontSize: 20
  }
});

const theme = createMuiTheme({
  palette,
  typography
});

const PrivateRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/events" />
    <Route exact path="/(events|performances|critiques)" component={Home} />
    <Route component={Landing} />
  </Switch>
);

const PublicRoutes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path={routes.SIGN_IN} component={SignInPage} />
    <Route component={Landing} />
  </Switch>
);

export default class App extends React.Component {
  state = {};

  render() {
    // TODO: check user login from Redux
    const authenticated = true;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          {authenticated ? (
            <div>
              <Header />
              <PrivateRoutes />
            </div>
          ) : (
            <PublicRoutes />
          )}
        </Router>
      </MuiThemeProvider>
    );
  }
}
