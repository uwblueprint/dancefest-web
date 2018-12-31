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

const ProtectedRoute = (component) => {
  return auth.currentUser ? component : null;
}

function PrivateRoute ({component: Component, user, path, ...rest}) {
  console.log(rest);
  console.log(user)
  console.log(rest.match)
  return (user.loading ? <div> loading </div> :
    <Route
      path={path}
      {...rest}
      render={(props) => user.user
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
    // TODO: check user login from Redux
    const authenticated = auth.currentUser;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
            <div>
              <Header />{
                this.state.loading ? <div> loading </div> :
                <Switch>
                  <Route exact path="/" component={SignInPage}  />
                  <PrivateRoute user={this.state} path="/events/:eventId/performances" component={PerformancesSection} />
                  <PrivateRoute user={this.state} path="/events/:eventId/performance/:performanceId/adjudications" component={AdjudicationsSection} />
                  <PrivateRoute user={this.state} exact path='/events' component={EventsSection} />
                  <PrivateRoute user={this.state} exact path="/settings" component={SettingsSection} />
                  <Route component={Landing} />
                </Switch>
              }
            </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
