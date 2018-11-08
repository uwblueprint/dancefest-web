import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import FilterItem from './FilterItem';
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
    const { caption, classes } = this.props;
    const { anchorElement, menuOpen } = this.state;

    return (
      <React.Fragment>
        <MenuItem onClick={this.handleItemClick} className={classNames(classes.subMenuItem)}>
          {caption}
          <ArrowRightIcon />
        </MenuItem>
        <FilterItem
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={menuOpen}
          anchorElement={anchorElement}
          onClose={this.handleSubMenuClose} />
      </React.Fragment>
    );
  }
}

SubMenu.propTypes = {
  caption: PropTypes.string.isRequired,
  classes: PropTypes.node.isRequired
};

export default withStyles(styles)(SubMenu);
