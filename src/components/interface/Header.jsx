import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import styles from '../styles';
import '../../index.css';


const Header = ({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        DANCEFEST
      </Typography>
      <div
        style={{ marginLeft: '92%', cursor: 'pointer', color: 'white' }}>
        <Link to="/settings">
          <SettingsIcon />
        </Link>
      </div>
    </Toolbar>

  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
