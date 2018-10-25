import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from '../styles';

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        DANCEFEST
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Header);
