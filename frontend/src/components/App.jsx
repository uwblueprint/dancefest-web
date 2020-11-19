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
import SignIn from './SignIn';
import Landing from './Landing';

import { auth } from '../firebase/firebase';
import PerformanceAdjudicationsSection from './performanceAdjudications/PerformanceAdjudicationsSection';
import EventsSection from './events/EventsSection';
import Loading from './interface/Loading';
import PerformancesSection from './performances/PerformancesSection';
import SettingsSection from './settings/SettingsSection';
import FeedbackSection from './feedback/FeedbackSection';
import SchoolFeedbackSection from './feedback/SchoolFeedbackSection';
import AwardsSection from './awards/AwardsSection';
import AdjudicationSection from './adjudications/AdjudicationSection';
import AdjudicateForm from './adjudications/AdjudicateForm';

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
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    {...rest} />
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: auth.currentUser
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ loading: false, user });
    });
  }


  render() {
    const { loading, user } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          {
            loading ? (<Loading />) : (
              <React.Fragment>
                { user && <Header />}
                <Switch>
                  <Route exact path="/" render={props => (<SignIn {...props} user={user} />)} />
                  <PrivateRoute component={EventsSection} exact path="/events" user={user} />
                  <PrivateRoute component={SettingsSection} exact path="/settings" user={user} />
                  <PrivateRoute component={PerformancesSection} exact path="/events/:eventId/performances" user={user} />
                  <PrivateRoute component={AdjudicationSection} exact path="/events/:eventId/adjudications" user={user} />
                  <PrivateRoute component={AdjudicateForm} exact path="/events/:eventId/adjudications/performance/:performanceId" user={user} />
                  <PrivateRoute component={PerformanceAdjudicationsSection} exact path="/events/:eventId/performance/:performanceId/adjudications" user={user} />
                  <PrivateRoute component={FeedbackSection} exact path="/events/:eventId/feedback" user={user} />
                  <PrivateRoute component={AwardsSection} exact path="/events/:eventId/awards/:awardId" user={user} />
                  <Route component={SchoolFeedbackSection} exact path="/school/:eventId/:token" />
                  <Route component={Landing} />
                </Switch>
              </React.Fragment>
            )
          }
        </Router>
      </MuiThemeProvider>
    );
  }
}
