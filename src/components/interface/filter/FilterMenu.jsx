import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SubMenu from './SubMenu';

export default class FilterMenu extends React.Component {
  // THIS HSOULD HANDLE STATE
  state = {}

  render() {
    const {
      anchorElement,
      open,
      onClose,
      onChange,
      menuItems,
      ...others
    } = this.props;

    return (
      <Menu {...others} anchorEl={anchorElement} open={open} onClose={onClose}>
        {menuItems.map(menuItem => (
          <SubMenu
            caption={menuItem.caption}
            choices={menuItem.options}
            key={menuItem.key}
            onChange={onChange} />
        ))}
        <hr />
        <MenuItem onClick={() => {}}>Clear All Filters</MenuItem>
      </Menu>
    );
  }
}

FilterMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
