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
import Header from './interface/Header';
import SignInPage from './SignIn';
import Landing from './Landing';

import AdjudicationsSection from './adjudications/AdjudicationsSection';
import EventsSection from './events/EventsSection';
import PerformancesSection from './performances/PerformancesSection';
import SettingsSection from './settings/SettingsSection';

import * as routes from '../constants/routes';

const palette = createPalette({
  primary: {
    main: '#de2706'
  },
  secondary: {
    main: '#000'
  },
  text: {
    primary: '#4d4d4d'
  }
});

const typography = createTypography(palette, {
  fontFamily: "'Raleway', sans-serif",
  fontSize: 14,
  headline: {
    fontFamily: "'Fjalla One', sans-serif",
    fontSize: 20
  }
});

const theme = createMuiTheme({
  palette,
  typography,
  overrides: {
    MuiFilledInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid black'
        },
        '&$focused:after': {
          borderBottom: '2px solid black'
        }
      }
    },
    MuiInput: {
      root: {
        underline: {
          '&:after': {
            borderBottom: '2px solid black'
          },
          '&$focused:after': {
            borderBottom: '2px solid black'
          }
        }
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'black',
          fontWeight: 'semi-bold'
        }
      },
      focused: {
        '&$focused': {
          color: 'black',
          fontWeight: 'semi-bold'
        }
      }
    }
  }
});

const PrivateRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/events" />
    <Route exact path="/events" component={EventsSection} />
    <Route exact path="/settings" component={SettingsSection} />
    <Route path="/events/:eventId/performances" component={PerformancesSection} />
    <Route path="/events/:eventId/performance/:performanceId/adjudications" component={AdjudicationsSection} />
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
