import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SubMenu from './SubMenu';

const FilterMenu = ({
  anchorElement,
  handleFilterClearAll,
  open,
  onClose,
  onChange,
  menuItems,
  ...others
}) => (
  <Menu {...others} anchorEl={anchorElement} onClose={onClose} open={open}>
    {menuItems.map((menuItem) => {
      const { caption, key, options } = menuItem;
      return (
        <SubMenu
          caption={caption}
          choices={options}
          key={key}
          onChange={onChange} />
      );
    })}
    <hr />
    <MenuItem onClick={handleFilterClearAll}>
      Clear All Filters
    </MenuItem>
  </Menu>
);

FilterMenu.propTypes = {
  handleFilterClearAll: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default FilterMenu;
