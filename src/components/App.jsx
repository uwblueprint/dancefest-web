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

const PrivateRoute = ({
  component: Component,
  path,
  user,
  ...rest
}) => (
  <Route
    path={path}
    render={props => (user ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location }}} />)}
    {...rest} />
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth.currentUser,
      loading: true
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user, loading: false });
    });
  }


  render() {
    const { user, loading } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            {
              // TODO: Once we merge in PR#27, we'll swap this with the react loading icon
              loading ? (<div> loading </div>) : (
                <React.Fragment>
                  { user && <Header /> }
                  <Switch>
                    <Route exact path="/" render={props => (<SignInPage {...props} user={user} />)} />
                    <PrivateRoute component={EventsSection} exact path="/events" user={user} />
                    <PrivateRoute component={SettingsSection} exact path="/settings" user={user} />
                    <PrivateRoute component={PerformancesSection} path="/events/:eventId/performances" user={user} />
                    <PrivateRoute component={AdjudicationsSection} path="/events/:eventId/performance/:performanceId/adjudications" user={user} />
                    <Route component={Landing} />
                  </Switch>
                </React.Fragment>
              )
            }
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
