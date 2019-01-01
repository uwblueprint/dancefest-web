import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

// import Navigation from './Navigation';
import Header from './interface/Header';
import SignInPage from './SignIn';
import Landing from './Landing';

import { auth } from '../firebase/firebase';
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

const theme = createMuiTheme({
  palette,
  typography: {
    useNextVariants: true,
    fontFamily: "'Raleway', sans-serif",
    fontSize: 14,
    subtitle1: {
      fontFamily: "'Fjalla One', sans-serif",
      fontSize: 20
    },
    h3: {
      fontFamily: "'Fjalla One', sans-serif",
      textTransform: 'uppercase',
      fontSize: 36,
      color: '#de2706'
    }
  },
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

function PrivateRoute ({component: Component, user, path, ...rest}) {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => user
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

const Routes = ({state}) => (
  <Switch>
    <Route exact path="/" component={SignInPage}  />
    <PrivateRoute user={state.user} path="/events/:eventId/performances" component={PerformancesSection} />
    <PrivateRoute user={state.user} path="/events/:eventId/performance/:performanceId/adjudications" component={AdjudicationsSection} />
    <PrivateRoute user={state.user} exact path='/events' component={EventsSection} />
    <PrivateRoute user={state.user} exact path="/settings" component={SettingsSection} />
    <Route component={Landing} />
  </Switch>
);

const PublicRoutes = () => (
  <Switch>
    <Route exact path="/" component={SignInPage} />
    <Route exact path={routes.SIGN_IN} component={SignInPage} />
    <Route component={Landing} />
  </Switch>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      user: auth.currentUser,
      loading: true
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user: user, loading: false });
    });
  }


  render() {
    const { user, loading } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
            <div>
              { !loading && false && <Header /> }
              {
                // TODO: Once we merge in PR#27, we'll swap this with the react loading icon
                loading ? <div> loading </div> :
                <Switch>
                  <Route exact path="/" render={(props) => (<SignInPage {...props} user={user} />)} />
                  <PrivateRoute component={EventsSection} exact path="/events" user={user} />
                  <PrivateRoute component={SettingsSection} exact path="/settings" user={user} />
                  <PrivateRoute component={PerformancesSection} path="/events/:eventId/performances" user={user} />
                  <PrivateRoute component={AdjudicationsSection} path="/events/:eventId/performance/:performanceId/adjudications" user={user} />
                  <Route component={Landing} />
                </Switch>
              }
            </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
