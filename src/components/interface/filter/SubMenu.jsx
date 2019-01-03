import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import withStyles from '@material-ui/core/styles/withStyles';

import classNames from 'classnames';
import CheckBox from '../CheckBox';
import styles from '../../styles';

class SubMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorElement: null
    };
  }

  handleItemClick = (event) => {
    if (!this.anchorElement) {
      this.setState({
        anchorElement: event.currentTarget
      });
    }

    this.setState({
      menuOpen: !this.menuOpen
    });
  };

  handleSubMenuClose = () => {
    this.setState({
      menuOpen: false
    });
  };

  render() {
    const {
      caption,
      classes,
      choices,
      onChange
    } = this.props;
    const { anchorElement, menuOpen } = this.state;
    const anchorOrgin = { vertical: 'top', horizontal: 'right' };
    const transformOrigin = { vertical: 'top', horizontal: 'left' };

    return (
      <React.Fragment>
        <MenuItem onClick={this.handleItemClick} className={classNames(classes.subMenuItem)}>
          {caption}
          <ArrowRightIcon />
        </MenuItem>
        <Menu
          anchorEl={anchorElement}
          anchorOrigin={anchorOrgin}
          classes={{ paper: classes.subMenuOptions }}
          getContentAnchorEl={null}
          onClose={this.handleSubMenuClose}
          open={menuOpen}
          transformOrigin={transformOrigin}>
          <CheckBox
            choices={choices}
            onChange={onChange} />
        </Menu>
      </React.Fragment>
    );
  }
}

SubMenu.propTypes = {
  caption: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  classes: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(SubMenu);
