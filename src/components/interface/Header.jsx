import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import styles from '../styles';

const Header = ({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        DANCEFEST
      </Typography>
      <div className={classes.header_search}>
        <div className={classes.header_searchIcon}>
          <SearchIcon />
        </div>
        <Input
          placeholder="Search"
          disableUnderline
          classes={{
            root: classes.header_inputRoot,
            input: classes.header_inputInput
          }} />
      </div>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Header);
