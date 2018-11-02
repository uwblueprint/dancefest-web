import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from '../styles';

const Header = ({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Link push to="/events" className={classes.link}>
        <Typography variant="headline" color="inherit">
          DANCEFEST
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
