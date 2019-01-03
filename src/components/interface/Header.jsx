import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SettingsDropdown from './settings/SettingsDropdown';
import styles from '../styles';
import '../../index.css';

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>
        <Typography variant="subtitle1" color="inherit">
          DANCEFEST
        </Typography>
      </Link>
      <SettingsDropdown />
      {
        /*
          <div style={{ marginLeft: '92%', cursor: 'pointer', color: 'white' }}>
            <Link to="/settings" style={{ color: 'white' }}>
              <SettingsIcon />
            </Link>
          </div>
        */
      }
    </Toolbar>
  </AppBar>
);

Header.propTypes = {};

export default withStyles(styles)(Header);
