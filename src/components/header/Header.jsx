import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Settings from '@material-ui/icons/Settings';
import styles from './styles';

const Header = ({ classes }) => (
  <AppBar position="static" color="primary" className={classes.root}>
    <Toolbar>
      <Typography variant="headline" color="inherit">
        DANCEFEST
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Input
          placeholder="Search"
          disableUnderline
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }} />
      </div>
      <Settings />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.objectOf().isRequired
};

export default withStyles(styles)(Header);
