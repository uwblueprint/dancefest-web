import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SubMenu from './SubMenu';

export default class EnhancedMenu extends React.Component {
  state = {}

  render() {
    const {
      anchorElement,
      open,
      onClose,
      menuItems,
      ...others
    } = this.props;

    return (
      <Menu {...others} anchorEl={anchorElement} open={open} onClose={onClose}>
        {menuItems.map(menuItem => (
          <SubMenu
            key={menuItem.key}
            caption={menuItem.caption}
            choices={menuItem.options} />
        ))}
        <hr />
        <MenuItem onClick={() => {}}>Clear All Filters</MenuItem>
      </Menu>
    );
  }
}

EnhancedMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
