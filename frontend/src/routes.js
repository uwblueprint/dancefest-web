import React, { useEffect } from 'react'; // React, lifecycle
import { useLocation, BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Navigation

// Navigation pages
import Home from 'pages/Home';
import Login from 'pages/Login';
import Events from 'pages/Events';
import Settings from 'pages/Settings';
import Performances from 'pages/Performances';

// Handle navigation
export default function HandleNavigation() {
  return (
    // Navigation router
    <Router>
      {/* Restore scroll position on route change */}
      <Route component={RestoreScroll} />
      {/* Routes: rest */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/events" exact component={Events} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/performances" exact component={Performances} />
      </Switch>
    </Router>
  );
}

// Handle scroll restoration
function RestoreScroll() {
  // Collect current pathname
  const { pathname } = useLocation();

  /**
   * Scroll to top of page
   */
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Component lifecycle run on pathname change
  useEffect(scrollToTop, [pathname]);

  return null;
}
