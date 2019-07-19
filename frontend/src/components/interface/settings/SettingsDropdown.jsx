import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import withStyles from '@material-ui/core/styles/withStyles';

import { auth } from '../../../firebase/firebase';
import styles from '../../styles';

class SettingsDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: undefined
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  handleLogout = () => {
    auth.signOut();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.settingsDropdown_wrapper}>
        <SettingsIcon
          aria-owns={anchorEl && 'simple-menu'}
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{ cursor: 'pointer' }} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <Link style={{ outline: 'none', textDecoration: 'none' }} to="/settings">
            <MenuItem onClick={this.handleClose}>Settings</MenuItem>
          </Link>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

SettingsDropdown.propTypes = {
  classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(SettingsDropdown);
