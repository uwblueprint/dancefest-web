import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/PlaylistAdd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SubMenu from './SubMenu';

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      filtered,
      handleFilterChecked,
      handleFilterClearAll,
      options
    } = this.props;
    const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
    const transformOrigin = { vertical: 'top', horizontal: 'left' };
    const categories = Object.keys(options);
    const renderOptions = (name, opt) => (opt.map(o => ({
      checked: filtered[name].includes(o),
      label: o,
      name,
      value: o
    })));

    const menuItems = options ? categories.map((name, index) => {
      const choices = renderOptions(name, options[name]);
      return {
        caption: name,
        key: `${name}-${index}`,
        choices
      };
    }) : [];

    return (
      <React.Fragment>
        <Button onClick={this.handleMenuOpen}>
          Filter
          <FilterIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          getContentAnchorEl={null}
          transformOrigin={transformOrigin}
          onClose={this.handleMenuClose}
          open={Boolean(anchorEl)}>
          {menuItems.map((menuItem) => {
            const { caption, key, choices } = menuItem;
            return (
              <SubMenu
                caption={caption}
                choices={choices}
                key={key}
                onChange={handleFilterChecked} />
            );
          })}
          <hr />
          <MenuItem onClick={handleFilterClearAll}>
            Clear All Filters
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

FilterMenu.propTypes = {
  filtered: PropTypes.shape.isRequired,
  handleFilterChecked: PropTypes.func.isRequired,
  handleFilterClearAll: PropTypes.func.isRequired,
  options: PropTypes.shape.isRequired
};

export default FilterMenu;
